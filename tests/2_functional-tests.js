const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

    test('can convert valid input', function(done){
        chai.request(server).keepOpen().get('/api/convert?input=10L').end(
            function(err, res){
              
                assert.equal(res.body.returnNum, 2.64172);
                done();
            }
        )
    });

    test('return error in invalid input', function(done){
        chai.request(server).keepOpen().get('/api/convert?input=32g').end(
            function(err, res){
                assert.equal(res.body.error, 'invalid unit');
                done();
            }
        )
    })

    test ('return invalid number', function(done){
        chai.request(server).keepOpen().get('/api/convert?input=3/7.2/4kg').end(
            function(err, res){
                assert.equal('invalid number', res.body.error)
                done();
            }
        )
    })

    test('return invalid unit and number', function(done){
        chai.request(server).keepOpen().get('/api/convert?input=3/7.2/4kilomegagram').end(
            function(err, res){
                assert.equal('invalid number and unit', res.body.error);
                done();
            }
        )
    })

    test('can convert when a number is not provided', function(done){
        chai.request(server).keepOpen().get('/api/convert?input=kg').end( function(err, res){
            assert.equal(res.body.returnNum , 2.20462)
            done();
        })
    })


});
