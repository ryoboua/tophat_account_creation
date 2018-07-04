const fs = require('fs');
const csv = require('fast-csv')
const {Builder, By, Key, until} = require('selenium-webdriver');
const stream = fs.createReadStream("data.csv");

var index = 0
const ACCOUNTS = []

const getAccounts = () => {
        csv
        .fromStream(stream, {headers : true})
        .on("data", function(data){
            return ACCOUNTS.push(data)
        })
        .on("end", function(){
            sendOff()
        });
}

const sendOff = () => {
    //createStudentAccounts(ACCOUNTS)
    createStudentTrialAccounts(ACCOUNTS)

}

getAccounts()


// const createStudentAccounts =  async function([professor, ...tail]) {
//     if(index === 80) return
//     console.log('Trying to Create Account ' + professor.Email)

//     let driver = await new Builder().forBrowser('firefox').build();
//     try {
//     await driver.get('https://app.tophat.com/register/student/org/4067/join_code/854744/info/');
//     await driver.wait(until.elementLocated(By.className("create-account__content")))
//     //Enter user information
//     await driver.sleep(750)
//     await driver.findElement(By.id("firstName")).sendKeys(professor.FirstName)
//     await driver.findElement(By.id("lastName")).sendKeys(professor.LastName)
//     await driver.findElement(By.id("email")).sendKeys(professor.Email)
//     await driver.findElement(By.id("password")).sendKeys(professor.Password)
//     await driver.sleep(750)
//     //Check the terms and condition checkbox
//     await driver.findElement(By.id("acceptedTerms")).click()
//     //Click Next
//     await driver.wait(until.elementLocated(By.className("sc-bZQynM bQXXNe"))
//     , 5000)
//     .then(
//         async (data) => {
//                 console.log('Created Account ' + professor.Email )
//                 await driver.findElement(By.className("sc-bZQynM bQXXNe")).click()

//                 await driver.wait(until.elementLocated(By.className("skip-step-link__link")))
//                 await driver.sleep(500)
//                 await driver.findElement(By.className("skip-step-link__link")).click()

//                 await driver.wait(until.elementLocated(By.className("skip-step-link__link")))
//                 await driver.sleep(500)
//                 await driver.findElement(By.className("skip-step-link__link")).click()

//                 await driver.wait(until.elementLocated(By.className("sc-bZQynM bQXXNe")))
//                 await driver.findElement(By.className("sc-bZQynM bQXXNe")).click()
//                 // await driver.sleep(500)
//                 // await driver.wait(until.elementLocated(By.className("prepaid")))
//                 // await driver.findElement(By.className("prepaid")).click()
//                 // await driver.sleep(500)

//                 // await driver.wait(until.elementLocated(By.id("subscription_code")))
//                 // await driver.sleep(500)
//                 // await driver.findElement(By.id("subscription_code")).sendKeys("usbinbowcebzeb")

//                 // let subscriptionForm = await driver.findElement(By.id("simple-modal"))
//                 // await subscriptionForm.findElement(By.className("btn btn-primary")).click()

//                 // await driver.wait(until.elementLocated(By.className("thank-you")))
//                 console.log('Subscription Succesfully applied for ' + professor.Email + '\n')
//                 await driver.sleep(2000)
//                 await driver.quit()
//                 index++
//                 return createStudentAccounts(tail)
//         }
//     ,
//         async (data) => {
//             await driver.quit()
//             return createStudentAccounts([professor, ...tail])
//         }
//     )

//     } catch(error) {
//         console.log(error)
//         }
// }

const createStudentTrialAccounts = async function([professor, ...tail]) {
    if(index === 100) return
    console.log('Trying to Create Account ' + professor.Email)

    let driver = await new Builder().forBrowser('firefox').build();
    try {
        await driver.get('https://app.tophat.com/register/student/org/4067/join_code/854744/info/');
        await driver.wait(until.elementLocated(By.className("create-account__content")))
        //Enter user information
        await driver.findElement(By.id("firstName")).sendKeys(professor.FirstName)
        await driver.findElement(By.id("lastName")).sendKeys(professor.LastName)
        await driver.findElement(By.id("email")).sendKeys(professor.Email)
        await driver.findElement(By.id("password")).sendKeys(professor.Password)
        //Check the terms and condition checkbox
        await driver.findElement(By.id("acceptedTerms")).click()
        await driver.wait(until.elementLocated(By.className("s1cq3ann-0-sc-htpNat kzGVCR"))
        , 5000)
        .then(
            async () => {
                await driver.findElement(By.className("s1cq3ann-0-sc-htpNat kzGVCR")).click()
                //Click Okay
                console.log('Created Account ' + professor.Email )
                await driver.sleep(6000)
                await driver.quit()
                index++
                return createStudentTrialAccounts(tail)
            }
            ,
            async (data) => {
                await driver.quit()
                return createStudentTrialAccounts([professor, ...tail])
            }

        )

    } catch(error) {
      console.log(error)
    }
  }




