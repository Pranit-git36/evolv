from __future__ import annotations

from dataclasses import dataclass
from typing import List, Optional, Tuple


# ---------- Public API ----------

def preprocess_error_input(raw_text: str) -> List[str]:
    """Normalize raw error text into a list of non‑empty lines."""
    return [
        line.strip()
        for line in raw_text.strip().split("\n")
        if line.strip() != ""
    ]


@dataclass
class ErrorExplanation:
    """Structured explanation for a Python error."""

    family: str
    confidence: str  # "high", "medium", "low"
    core_error_line: Optional[str]
    family_summary: str
    what_failed: str
    why_it_happens: str
    where_to_look_first: str
    refinement_note: Optional[str] = None
    notes: Optional[str] = None


KNOWN_FAMILIES = [
    "TypeError",
    "NameError",
    "IndexError",
    "KeyError",
    "ImportError",
    "ModuleNotFoundError",
    "AttributeError",
    "SyntaxError",
]


def translate_error(raw_text: str) -> ErrorExplanation:
    """
    Main entry point.

    Takes raw Python traceback text and returns a structured, beginner‑friendly explanation.
    """
    lines = preprocess_error_input(raw_text)

    if not lines:
        return ErrorExplanation(
            family="UnknownPythonError",
            confidence="low",
            core_error_line=None,
            family_summary="I could not find any Python error lines in this input.",
            what_failed="No recognizable Python error message was detected.",
            why_it_happens="This can happen if the text is not a Python traceback or only contains logs without the final error line.",
            where_to_look_first="Double‑check that you pasted the full Python error, including the final line that mentions something like 'TypeError', 'NameError', or 'SyntaxError'.",
            notes="This tool currently understands a limited set of common Python error types and may not recognize every kind of failure.",
        )

    core_line = _extract_core_error_line(lines)
    if core_line is None:
        return ErrorExplanation(
            family="UnknownPythonError",
            confidence="low",
            core_error_line=None,
            family_summary="I could not locate a clear final Python error line.",
            what_failed="The traceback does not end with a standard Python error like 'TypeError' or 'SyntaxError'.",
            why_it_happens="Some tools wrap Python errors or log them in custom formats that hide the final error type.",
            where_to_look_first="Look for the last line in your logs that contains an error type ending in 'Error' or 'Exception' and focus there.",
            notes="Once you identify the final Python error line, you can paste just that line here for a more targeted explanation.",
        )

    family = _classify_error_family(core_line)

    if family == "UnknownPythonError":
        fam_exp = _build_unknown_family_explanation(core_line)
        return ErrorExplanation(
            family=family,
            confidence="low",
            core_error_line=core_line,
            **fam_exp,
        )

    fam_exp = _build_family_explanation(family)
    refinement = _refine_message(family, core_line)

    if refinement is not None:
        confidence = "high"
        what_failed = refinement["what_failed"]
        why_it_happens = refinement["why_it_happens"]
        where_to_look_first = refinement["where_to_look_first"]
        refinement_note = refinement.get("refinement_note")
    else:
        confidence = "medium"
        what_failed = fam_exp["what_failed"]
        why_it_happens = fam_exp["why_it_happens"]
        where_to_look_first = fam_exp["where_to_look_first"]
        refinement_note = "This explanation is based on the general error family only. The exact situation in your code might be slightly different."

    return ErrorExplanation(
        family=family,
        confidence=confidence,
        core_error_line=core_line,
        family_summary=fam_exp["family_summary"],
        what_failed=what_failed,
        why_it_happens=why_it_happens,
        where_to_look_first=where_to_look_first,
        refinement_note=refinement_note,
        notes="This is a rule‑based explanation for common Python errors. It does not run your code or guess beyond the patterns it understands.",
    )


# ---------- Step 2: Extract final error line ----------

_GENERIC_ERROR_MARKERS = (
    "error",
    "exception",
)

_TRACEBACK_FOOTER_MARKERS = (
    "during handling of the above exception",
    "the above exception was the direct cause",
)


def _looks_like_python_error_line(line: str) -> bool:
    lower = line.lower()
    if any(marker in lower for marker in _TRACEBACK_FOOTER_MARKERS):
        return False

    # Common pattern: "TypeError: message"
    for family in KNOWN_FAMILIES:
        if family in line:
            return True

    # Fallback: any line mentioning "Error" or "Exception"
    return any(marker in lower for marker in _GENERIC_ERROR_MARKERS)


def _extract_core_error_line(lines: List[str]) -> Optional[str]:
    """
    Scan from bottom to top and pick the final meaningful Python error line.
    """
    for line in reversed(lines):
        if _looks_like_python_error_line(line):
            return line
    return None


# ---------- Step 3: Classify by family ----------

def _classify_error_family(core_line: str) -> str:
    # Order matters: more specific before more general
    ordered_families = [
        "ModuleNotFoundError",  # subset of ImportError
        "ImportError",
        "TypeError",
        "NameError",
        "IndexError",
        "KeyError",
        "AttributeError",
        "SyntaxError",
    ]

    for fam in ordered_families:
        if fam in core_line:
            return fam

    return "UnknownPythonError"


# ---------- Step 4: Explanation system ----------

def _build_family_explanation(family: str) -> dict:
    """
    Return base explanations for each supported error family.
    """
    if family == "TypeError":
        return {
            "family_summary": "A `TypeError` means an operation was applied to a value of the wrong type.",
            "what_failed": "Python tried to use a value in a way that its type does not support.",
            "why_it_happens": "This often happens when you mix strings and numbers, call something that is not a function, or index into a value that is not a sequence or mapping.",
            "where_to_look_first": "Check the line of code mentioned in the traceback and inspect the types of the variables involved in the operation.",
        }
    if family == "NameError":
        return {
            "family_summary": "A `NameError` means Python cannot find a variable or name you used.",
            "what_failed": "Python looked up a name and could not find any variable, function, or import with that name.",
            "why_it_happens": "This usually comes from typos, using a variable before defining it, or using a name that only exists inside another scope.",
            "where_to_look_first": "Look for the name mentioned in the error and confirm it is spelled correctly and defined before it is used.",
        }
    if family == "IndexError":
        return {
            "family_summary": "An `IndexError` means you tried to access an element at a position that does not exist.",
            "what_failed": "Python tried to index into a sequence (like a list or string) but the index was outside the valid range.",
            "why_it_happens": "This often happens when loops overshoot the end of a list, or when you assume a list has more items than it actually does.",
            "where_to_look_first": "Print the length of the sequence and the index you are using on the failing line to see which one is out of range.",
        }
    if family == "KeyError":
        return {
            "family_summary": "A `KeyError` means a dictionary was asked for a key that it does not have.",
            "what_failed": "Python tried to look up a key in a dictionary (or similar mapping) and that key was missing.",
            "why_it_happens": "This is common when you assume a key is always present, or when the data structure changes and some keys are optional.",
            "where_to_look_first": "Check which keys are actually present in the dictionary just before the failing line (for example by printing `dict_obj.keys()`).",
        }
    if family == "ImportError":
        return {
            "family_summary": "An `ImportError` means Python could not import something you asked for.",
            "what_failed": "Python tried to load a module or an object from a module and failed.",
            "why_it_happens": "This can come from typos in module names, circular imports, or trying to import something that does not exist in the module.",
            "where_to_look_first": "Check the import line, verify the module is installed and importable in a Python shell, and confirm that the object name exists in that module.",
        }
    if family == "ModuleNotFoundError":
        return {
            "family_summary": "A `ModuleNotFoundError` means Python cannot find the module you tried to import.",
            "what_failed": "Python looked for a module with the given name on `sys.path` and did not find it.",
            "why_it_happens": "This usually happens when a package is not installed, installed in a different environment, or the import path is wrong.",
            "where_to_look_first": "Confirm the package is installed in the environment you are using and that the module name in the import statement is correct.",
        }
    if family == "AttributeError":
        return {
            "family_summary": "An `AttributeError` means an object does not have the attribute or method you tried to use.",
            "what_failed": "Python tried to access an attribute on an object and that attribute was not defined.",
            "why_it_happens": "This often comes from typos in attribute names, using the wrong type of object, or expecting a method that only exists on a different class.",
            "where_to_look_first": "Print the object and its type on the failing line, then check which attributes it actually has (for example with `dir(obj)` in a Python shell).",
        }
    if family == "SyntaxError":
        return {
            "family_summary": "A `SyntaxError` means Python could not understand your code because it is not valid Python syntax.",
            "what_failed": "The Python parser encountered code that breaks the language rules.",
            "why_it_happens": "This typically comes from missing colons, unmatched quotes or parentheses, incorrect indentation, or pasting non‑Python text into a file.",
            "where_to_look_first": "Look at the line (and sometimes the line above) marked in the error, paying close attention to punctuation and indentation.",
        }

    # Fallback, should not normally be used for known families
    return _build_unknown_family_explanation("")[0]


def _build_unknown_family_explanation(core_line: str) -> dict:
    return {
        "family_summary": "This looks like a Python error, but it does not match the common error types I know about.",
        "what_failed": f"The final error line was: {core_line!r}, which I cannot confidently map to a specific Python error family.",
        "why_it_happens": "There are many specialized and library‑specific errors in Python, and this simple tool only understands a small set of built‑in error types.",
        "where_to_look_first": "Read the final error line carefully and, if possible, search the exact error text in the official documentation or trusted resources.",
    }


# ---------- Step 4b: Message‑level refinements ----------

_Refinement = Tuple[str, dict]


def _type_error_refinements() -> List[_Refinement]:
    return [
        (
            "not supported between instances of",
            {
                "what_failed": "Python tried to compare or combine two values whose types do not support that operation together.",
                "why_it_happens": "This often occurs when you mix incompatible types, such as comparing a string to an integer or adding a list to a dictionary.",
                "where_to_look_first": "Check the operation mentioned in the error (such as `<`, `+`, or `==`) and print the types of both values involved using `type(...)`.",
                "refinement_note": "This explanation targets binary operations like comparisons or arithmetic between incompatible types.",
            },
        ),
        (
            "object is not subscriptable",
            {
                "what_failed": "Python tried to use square‑bracket indexing on a value that does not support it.",
                "why_it_happens": "This happens when you treat something like `None`, a function, or an integer as if it were a list, dictionary, or other container.",
                "where_to_look_first": "On the failing line, check the value before the `[ ... ]` and print its value and type to see what it really is.",
                "refinement_note": "Look for variables that unexpectedly became `None` or for functions that you forgot to call with parentheses.",
            },
        ),
        (
            "missing 1 required positional argument",
            {
                "what_failed": "A function was called without providing one of the required positional arguments.",
                "why_it_happens": "This usually means the call site forgot to pass a parameter that the function definition marks as required.",
                "where_to_look_first": "Compare the function definition with the place where it is called and ensure all required arguments are supplied in the correct order.",
                "refinement_note": "If you recently changed the function signature, double‑check all call sites were updated.",
            },
        ),
        (
            "takes 1 positional argument but 2 were given",
            {
                "what_failed": "A function received more positional arguments than it was defined to accept.",
                "why_it_happens": "This often happens with instance methods when `self` is handled incorrectly or when you pass extra arguments by mistake.",
                "where_to_look_first": "Inspect the function definition and the call to see how many arguments each side expects, paying attention to methods vs. plain functions.",
                "refinement_note": "If this involves a method on a class, remember that `self` is passed automatically on instance calls.",
            },
        ),
    ]


def _attribute_error_refinements() -> List[_Refinement]:
    return [
        (
            "object has no attribute",
            {
                "what_failed": "Python tried to access an attribute on an object, but that attribute does not exist for that object's type.",
                "why_it_happens": "This is usually caused by a typo in the attribute name or by assuming the object is a different type than it really is.",
                "where_to_look_first": "Print the object and its type, then check the exact attribute name defined on that type (or in the documentation).",
                "refinement_note": "Pay close attention to singular vs plural names and letter casing in the attribute.",
            },
        ),
        (
            "'NoneType' object has no attribute",
            {
                "what_failed": "An attribute was accessed on `None` instead of on a real object.",
                "why_it_happens": "Some earlier operation returned `None` (for example, a function with no explicit return) and you continued as if it were a real object.",
                "where_to_look_first": "Trace back where the variable became `None` by printing it just before the failing line or adding checks after each step that might return `None`.",
                "refinement_note": "Focus on why the value is `None` rather than on the missing attribute itself.",
            },
        ),
    ]


def _name_error_refinements() -> List[_Refinement]:
    return [
        (
            "is not defined",
            {
                "what_failed": "A name was used that Python does not know about in the current scope.",
                "why_it_happens": "This typically happens when a variable is used before assignment, when an import is missing, or when there is a simple typo.",
                "where_to_look_first": "Search for where the name is supposed to be defined and make sure that code runs before the failing line.",
                "refinement_note": "If this name should come from an import, confirm that the import statement is present and correctly spelled.",
            },
        ),
    ]


def _key_error_refinements() -> List[_Refinement]:
    return [
        (
            "",  # generic KeyError refinement, message usually is just the key
            {
                "what_failed": "A dictionary was asked for a key that is not present.",
                "why_it_happens": "Keys can be missing when input data is incomplete, when default values are not handled, or when the key name is slightly different than expected.",
                "where_to_look_first": "Print the dictionary's keys and compare them to the key shown in the error message.",
                "refinement_note": "Consider using `dict.get(key)` with a default or checking `if key in dict_obj` before accessing it directly.",
            },
        ),
    ]


def _index_error_refinements() -> List[_Refinement]:
    return [
        (
            "list index out of range",
            {
                "what_failed": "A list was indexed at a position that does not exist.",
                "why_it_happens": "This usually happens when loops go one step too far or when you assume a list has more elements than it actually does.",
                "where_to_look_first": "Print the list length and the index right before the failing line to confirm which value is invalid.",
                "refinement_note": "Off‑by‑one errors (using `<=` instead of `<`) are a common source of this problem.",
            },
        ),
    ]


def _import_error_refinements() -> List[_Refinement]:
    return [
        (
            "cannot import name",
            {
                "what_failed": "Python found the module but could not find the specific name you asked to import from it.",
                "why_it_happens": "The object may not exist in that module, its name may have changed, or circular imports may be preventing it from being defined in time.",
                "where_to_look_first": "Open the module being imported and verify that the name appears there. If it does, look for circular import patterns.",
                "refinement_note": "Try importing the module alone in a Python shell and inspecting its attributes to see what it actually exposes.",
            },
        ),
    ]


def _module_not_found_refinements() -> List[_Refinement]:
    return [
        (
            "No module named",
            {
                "what_failed": "Python could not find any installed module with the given name.",
                "why_it_happens": "The package may not be installed, it may be installed in another environment, or the import path may be slightly wrong.",
                "where_to_look_first": "Check that you are using the correct virtual environment and run the appropriate package manager command (like `pip install package_name`) if needed.",
                "refinement_note": "If this is your own module, ensure that its folder is on `sys.path` or that you are running Python from the correct project root.",
            },
        ),
    ]


def _syntax_error_refinements() -> List[_Refinement]:
    return [
        (
            "invalid syntax",
            {
                "what_failed": "Python could not parse the code at the marked location.",
                "why_it_happens": "Typical causes include missing colons, extra or missing parentheses, or mixing code from another language.",
                "where_to_look_first": "Carefully inspect the line shown and the one just above it, looking for mismatched punctuation or indentation issues.",
                "refinement_note": "The little arrow (^) in the traceback points near where Python got confused, but the real issue may be a few characters earlier.",
            },
        ),
    ]


_REFINEMENT_BUILDERS = {
    "TypeError": _type_error_refinements,
    "AttributeError": _attribute_error_refinements,
    "NameError": _name_error_refinements,
    "KeyError": _key_error_refinements,
    "IndexError": _index_error_refinements,
    "ImportError": _import_error_refinements,
    "ModuleNotFoundError": _module_not_found_refinements,
    "SyntaxError": _syntax_error_refinements,
}


def _refine_message(family: str, core_line: str) -> Optional[dict]:
    builder = _REFINEMENT_BUILDERS.get(family)
    if builder is None:
        return None

    lower_line = core_line.lower()
    best_match: Optional[dict] = None
    best_pattern_length = -1

    for pattern, details in builder():
        if pattern == "" or pattern.lower() in lower_line:
            # Prefer more specific (longer) patterns
            length = len(pattern)
            if length > best_pattern_length:
                best_pattern_length = length
                best_match = details

    return best_match


if __name__ == "__main__":
    import sys

    raw = sys.stdin.read()
    explanation = translate_error(raw)

    print(f"Error family: {explanation.family}")
    print(f"Confidence: {explanation.confidence}")
    print()
    if explanation.core_error_line:
        print("Core error line:")
        print(f"  {explanation.core_error_line}")
        print()
    print("Summary:")
    print(f"  {explanation.family_summary}")
    print()
    print("What failed:")
    print(f"  {explanation.what_failed}")
    print()
    print("Why it usually happens:")
    print(f"  {explanation.why_it_happens}")
    print()
    print("Where to look first:")
    print(f"  {explanation.where_to_look_first}")
    if explanation.refinement_note:
        print()
        print("Note:")
        print(f"  {explanation.refinement_note}")
    if explanation.notes:
        print()
        print("General note:")
        print(f"  {explanation.notes}")

