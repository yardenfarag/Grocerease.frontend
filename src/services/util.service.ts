function makeId(length = 10) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout | null;

    return function debouncedFn(this: ThisParameterType<T>, ...args: Parameters<T>): void {
        const context = this;

        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

function getColorForDate(dateString: string | undefined): string {
    if (!dateString) {
        return ''
    }
    const currentDate = new Date()
    const givenDate = new Date(dateString)

    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()
    const currentDay = currentDate.getDate()

    const givenYear = givenDate.getFullYear()
    const givenMonth = givenDate.getMonth()
    const givenDay = givenDate.getDate()

    const currentDateOnly = new Date(currentYear, currentMonth, currentDay)
    const givenDateOnly = new Date(givenYear, givenMonth, givenDay)

    if (givenDateOnly.getTime() === currentDateOnly.getTime()) {
        return '#e85d04'
    } else if (givenDateOnly.getTime() < currentDateOnly.getTime()) {
        return '#d00000'
    } else if (givenDateOnly.getTime() - currentDateOnly.getTime() <= 2 * 24 * 60 * 60 * 1000) {
        return '#ffc300'
    } else {
        return ''
    }
}

function generateRandomColor(input?: string): string {
    let hash = 0
    if (input) {

        for (let i = 0; i < input.length; i++) {
            const charCode = input.charCodeAt(i)
            hash = (hash << 5) - hash + charCode
            hash &= hash
        }

        const color = '#' + ((hash >>> 0) % 0xFFFFFF).toString(16).padStart(6, '0')
        return color
    }
    else return 'transparent'
}

function isColorDark(color: string): boolean {
    const hexColor = color.replace('#', '')
    const red = parseInt(hexColor.substr(0, 2), 16)
    const green = parseInt(hexColor.substr(2, 2), 16)
    const blue = parseInt(hexColor.substr(4, 2), 16)
    const relativeLuminance = (red * 0.299 + green * 0.587 + blue * 0.114) / 255

    return relativeLuminance <= 0.5
}

function formatDateDescription(dateString: string): string {
    const targetDate = new Date(dateString)
    const currentDate = new Date()

    const timeDiff = targetDate.getTime() - currentDate.getTime()
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))

    if (diffDays === 0) {
        return 'היום'
    } else if (diffDays === 1) {
        return 'מחר'
    } else if (diffDays === -1) {
        return 'אתמול'
    } else if (diffDays === 2) {
        return 'בעוד יומיים'
    } else if (diffDays === -2) {
        return 'לפני יומיים'
    } else if (diffDays === 3) {
        return 'בעוד 3 ימים'
    } else if (diffDays === -3) {
        return 'לפני 3 ימים'
    } else if (diffDays > 0) {
        if (diffDays >= 365) {
            const diffYears = Math.ceil(diffDays / 365)
            if (diffYears === 1) {
                return 'בעוד שנה'
            } else if (diffYears === 2) {
                return 'בעוד שנתיים'
            } else {
                return `בעוד ${diffYears} שנים`
            }
        } else if (diffDays >= 30) {
            const diffMonths = Math.ceil(diffDays / 30)
            if (diffMonths === 1) {
                return 'בעוד חודש'
            } else if (diffMonths === 2) {
                return 'בעוד חודשיים'
            } else {
                return `בעוד ${diffMonths} חודשים`
            }
        } else if (diffDays >= 7) {
            const diffWeeks = Math.ceil(diffDays / 7);
            if (diffWeeks === 1) {
                return 'בעוד שבוע'
            } else if (diffWeeks === 2) {
                return 'בעוד שבועיים'
            } else {
                return `בעוד ${diffWeeks} שבועות`
            }
        } else {
            return `בעוד ${diffDays} ימים`
        }
    } else if (diffDays < 0) {
        const absoluteDiffDays = Math.abs(diffDays)
        if (absoluteDiffDays >= 365) {
            const diffYears = Math.ceil(absoluteDiffDays / 365)
            if (diffYears === 1) {
                return 'לפני שנה'
            } else if (diffYears === 2) {
                return 'לפני שנתיים'
            } else {
                return `לפני ${diffYears} שנים`
            }
        } else if (absoluteDiffDays >= 30) {
            const diffMonths = Math.ceil(absoluteDiffDays / 30);
            if (diffMonths === 1) {
                return 'לפני חודש'
            } else if (diffMonths === 2) {
                return 'לפני חודשיים'
            } else {
                return `לפני ${diffMonths} חודשים`
            }
        } else if (absoluteDiffDays >= 7) {
            const diffWeeks = Math.ceil(absoluteDiffDays / 7);
            if (diffWeeks === 1) {
                return 'לפני שבוע'
            } else if (diffWeeks === 2) {
                return 'לפני שבועיים'
            } else {
                return `לפני ${diffWeeks} שבועות`
            }
        } else {
            return `לפני ${absoluteDiffDays} ימים`
        }
    }
    return 'לא ידוע'
}

function isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
}

function isExpiringInDays(date: Date, days: number, orMore = false): boolean {
    const today = new Date()
    const diffTime = date.getTime() - today.getTime()
    const diffDays = diffTime / (1000 * 3600 * 24)
    return orMore ? diffDays >= days : diffDays <= days
}

function calculateDays(dateString: string): number {
    const targetDate: Date = new Date(dateString)
    const currentDate: Date = new Date()
    const timeDifference: number = targetDate.getTime() - currentDate.getTime()
    const daysDifference: number = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

    return daysDifference
}



export const utilService = {
    makeId,
    debounce,
    getColorForDate,
    generateRandomColor,
    isColorDark,
    formatDateDescription,
    isToday,
    isExpiringInDays,
    calculateDays
}