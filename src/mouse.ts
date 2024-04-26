class Mouse {

    private static buttonMap = new Map<number, boolean>();
    private static buttonPressMap = new Map<number, boolean>([
        [257, false],
        [259, false]
    ]);

    private static handleMouseDown(button: number) {
        switch(button) {
            case 257:
                this.buttonMap.set(1, true);
                break;
            case 259:
                this.buttonMap.set(3, true);
                break;
        }
    }

    private static handleMouseUp(button: number) {
        this.buttonMap.set(button, false);
    }

    /**
     * Method to check if a mouse button is currently down.
     * 
     * @param button Mouse button to check - Obtainable from Slifer.buttons
     * @returns boolean
     */
    static isMouseDown(button: number) {
        const b = this.buttonMap.get(button);
        if (b != true) {
            return false;
        }

        return b;
    }

    /**
     * Method to check if mouse button has been clicked. Returns true
     * only once and wont return it again until mouse button is
     * released.
     * 
     * @param button Mouse button to check - Obtainable from Slifer.buttons
     * @returns boolean
     */
    static onMouseClick(button: number) {
        const resp = this.isMouseDown(button);
        if (resp && this.buttonPressMap.get(button) == false) {
            this.buttonPressMap.set(button, true);
            return true;
        } else  if (!resp) {
            this.buttonPressMap.set(button, false);
        }

        return false;
    }
}

export default Mouse;