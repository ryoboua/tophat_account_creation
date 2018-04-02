const fs = require('fs');
const csv = require('fast-csv')
const stream = fs.createReadStream("data.csv");
const tophat = require('./tophat.js')

var index = 0
const ACCOUNTS = []

const getAccounts = () => {
    const worm = setInterval(() => {
        
        if(index === 1) return clearInterval(worm)
        csv
        .fromStream(stream, {headers : true})
        .on("data", function(data){
            return ACCOUNTS.push(data)
        })
        .on("end", function(){
            sendOff()
        });
        index++
    },1000)


}

const sendOff = () => {
    let accounts = ACCOUNTS.slice((295))

        let professor = {
            firstName: accounts[index].FirstName,
            lastName: accounts[index].LastName,
            email: accounts[index].Email,
            password: accounts[index].Password
        }
        console.log(professor)
       tophat.createStudentAccounts(professor)
    
}



getAccounts()




 