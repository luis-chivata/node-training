function isPositiveNumber(value, zeroAllowed) {
    if(!Number.isNaN(value)){
        if(value === 0){
            return isZeroAllowed;
        } else {
            return value > 0;
        }
    } else {
        return false;
    }
}

module.exports = {
    isPositiveNumber: isPositiveNumber
};