export const formatTime = (milliseconds: number) => {
	if (milliseconds >= 86400000) {
		return `${Math.floor(milliseconds / 86400000)} day(s)`
	} else if (milliseconds >= 3600000) {
		return `${Math.floor(milliseconds / 3600000)} hour(s)`
	} else if (milliseconds >= 60000) {
		return `${Math.floor(milliseconds / 60000)} min(s)`
	} else {
		return `${Math.floor(milliseconds / 1000)} sec(s)`
	}
}
