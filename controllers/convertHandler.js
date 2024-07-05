function ConvertHandler() {
  
  this.getNum = function(input) {
    let numberPart = input.match(/^[^a-zA-Z]+/);
    if (!numberPart ){
      return 1;
    }
    numberPart = numberPart[0];
    let fractionParts= numberPart.split('/')
    if (fractionParts.length > 2) {
      return 'invalid number';
    }
    if (fractionParts.length == 2){
      return parseFloat(fractionParts[0]).toFixed(5) / parseFloat(fractionParts[1]).toFixed(5)
    }
      return parseFloat(numberPart);
  };
  
  this.getUnit = function(input) {
    let result= input.match(/[A-Za-z]+$/)[0];
    result = result.toLowerCase();
    if ( result != 'gal' && result != 'km' && result != 'mi' && result != 'lbs' && result !=  'kg' &&  result !=  'l'
    ){
      return 'invalid unit';
    } 
    else if (result == 'l'){
      return 'L';
    }
    else {
      return result;
    }
  };

  
  this.getReturnUnit = function(initUnit) {

    switch( initUnit.toLowerCase() ){
      case 'gal':
         return 'L'
      case  'lbs':
        return 'kg'
      case  'mi':
         return 'km'
      case  'km':
        return 'mi'
      case  'l':
        return 'gal'
      case  'kg':
        return 'lbs'
      case  'mi':
      default:
        return 'invalid unit';
    }
  };

  this.spellOutUnit = function(unit) {
    switch(unit.toLowerCase()){
      case 'gal':
        return 'gallons';
      case  'l':
        return 'liters';
      case  'lbs':
        return 'pounds';
      case  'kg':
        return 'kilograms';
      case  'mi':
        return 'miles';
      case  'km':
        return 'kilometers';
      default:
        return 'invalid unit';
    }
  
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    const unit = initUnit.toLowerCase();
    switch (true) {
      case unit == 'gal':
        result = initNum * galToL;
        break;
      case unit == 'l':
        result = initNum / galToL;
        break;

      case unit.includes('kg'):
        result = initNum / lbsToKg;
        break;
      case unit.includes('lbs'):
        result = initNum * lbsToKg;
        break;
      case unit.includes('mi'):
        result = initNum * miToKm;
        break;
      case unit.includes('km'):
        result = initNum / miToKm;
        break;
      default:
        return  'invalid unit';
    }
    
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {

    if (initNum == 'invalid number' && initUnit == 'invalid unit') {
      return 'invalid number and unit';
    } else if (initNum == 'invalid number') {
      return 'invalid number';
    } else if (initUnit == 'invalid unit') {
     return 'invalid unit';
    } else{
     return initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + returnNum + ' ' + this.spellOutUnit(returnUnit);
    }
  };
  
}

module.exports = ConvertHandler;
