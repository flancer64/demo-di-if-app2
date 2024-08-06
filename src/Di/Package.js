/**
 * @implements Trans_Api_Package
 */
export default class Client2_Di_Package {
    /**
     * @return {{length: number, width: number, height: number}}
     */
    getSize() {
        return {length: 45, width: 30, height: 10};
    }

    /**
     * @return {number}
     */
    getWeight() {
        return 1;
    }
}