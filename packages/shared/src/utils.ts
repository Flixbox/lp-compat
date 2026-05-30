/**
 * Compares two strings case-insensitively after trimming whitespace.
 * Returns true if both are null/undefined.
 */
const isSame = (a?: string | null, b?: string | null): boolean => {
	if (a === b) return true
	if (a == null || b == null) return false
	return a.trim().toLowerCase() === b.trim().toLowerCase()
}

/**
 * Checks if a target string contains the search string (case-insensitively).
 */
const contains = (target?: string | null, search?: string | null): boolean => {
	if (!target || !search) return false
	return target.toLowerCase().includes(search.toLowerCase())
}

export { isSame, contains }
