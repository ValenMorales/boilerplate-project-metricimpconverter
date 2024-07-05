const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('can read a number', function(){
        assert.isNumber(convertHandler.getNum('23'));
    })

    test('can read a decimal', function(){
        assert.isNumber(convertHandler.getNum('45.3'))
    })

    test ('can read fractions', function(){
        assert.isNumber(convertHandler.getNum(('3/4')))
    })

    test('can manage fractions with decimals', function(){
        assert.isNumber(convertHandler.getNum('5.3/3'))
    })

    test('can not read numbers bad specified', function(){
        assert.equal('invalid number',convertHandler.getNum('3/2/5'))
    })

    test('should return default value', function() {
        assert.equal(1 , convertHandler.getNum('alsjdfk'))
    })

    test(' should correctly read each valid input unit', function(){
        assert.equal('lbs', convertHandler.getUnit('lbs'))
        assert.equal('kg', convertHandler.getUnit('4/3kg'))
        assert.equal('mi', convertHandler.getUnit('2.3MI'))
        assert.equal('km', convertHandler.getUnit('5.6km'))
        assert.equal('gal', convertHandler.getUnit('gal'))
        assert.equal('L', convertHandler.getUnit('L'))
    })

    test(' should correctly return an error for an invalid input unit.', function(){
        assert.equal('invalid unit', convertHandler.getUnit('m'))
        assert.equal('invalid unit', convertHandler.getUnit('gallons'))
        assert.equal('invalid unit', convertHandler.getUnit('km/h'))
    })

    test(' should correctly return the spelled-out string unit for each valid input unit.',function(){
       
        assert.equal('kilograms', convertHandler.spellOutUnit('kg'))
        assert.equal('miles', convertHandler.spellOutUnit('mi'))
        assert.equal('kilometers', convertHandler.spellOutUnit('km'))
        assert.equal('gallons', convertHandler.spellOutUnit('gal'))
        assert.equal('liters', convertHandler.spellOutUnit('L'))
    })

    test('should correctly return the spelled-out string' , function(){
        assert.equal('pounds', convertHandler.spellOutUnit('lbs'))
    })

    test(' should correctly convert gal to L.', function(){
        const number = parseFloat(convertHandler.convert(1, 'gal'));
        assert.approximately(3.78541, number, 0.0001)
    })
    
    test('should correctly convert L to gal.', function() {
        assert.approximately(0.264172, parseFloat(convertHandler.convert(1, 'L')), 0.0001)
    })
    
    test('should correctly convert kg to lbs.', function() {
        assert.approximately(2.20462, parseFloat(convertHandler.convert(1, 'kg')), 0.0001)
    })
    
    test('should correctly convert lbs to kg.', function() {
        assert.approximately(0.453592, parseFloat(convertHandler.convert(1, 'lbs')), 0.0001)
    })

    test('should correctly convert mi to km.', function() {
        assert.approximately(1.60934, parseFloat(convertHandler.convert(1,'mi')), 0.0001)
    })
    
    test('should correctly convert km to mi.', function() {
        assert.approximately(0.621371, parseFloat(convertHandler.convert(1, 'km')), 0.0001)
    })
     

});