const {Builder, By, Key, until} = require('selenium-webdriver');
//const exports = module.exports = {}

exports.createStudentTrialAccounts = async function() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.get('https://app.tophat.com/register/student/org/2008/join_code/196307/info/');
       setTimeout(async () => {
          //Enter user information
          await driver.findElement(By.id("firstName")).sendKeys('dfd')
          await driver.findElement(By.id("lastName")).sendKeys('dfd')
          await driver.findElement(By.id("email")).sendKeys('r32@msu.edu')
          await driver.findElement(By.id("password")).sendKeys('temp123')
          //Check the terms and condition checkbox
          await driver.findElement(By.id("acceptedTerms")).click()
          //Click Create 7 Day Trial Account
          await driver.wait(until.elementLocated(By.className("sc-bZQynM gmljAi")))
          await driver.findElement(By.className("sc-bZQynM gmljAi")).click()
          //Click Okay
        //   await driver.wait(until.elementLocated(By.className("sc-gZMcBi gKhclg")))
        //   await driver.findElement(By.className("sc-gZMcBi gKhclg")).click()
       }, 2000 )
    } finally {
      console.log('ready')
    }
  }


exports.createStudentAccounts =  async function(professor) {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get('https://app.tophat.com/register/student/org/5042/join_code/936445/info/');
     setTimeout(async () => {
        //Enter user information
        await driver.findElement(By.id("firstName")).sendKeys(professor.firstName)
        await driver.findElement(By.id("lastName")).sendKeys(professor.lastName)
        await driver.findElement(By.id("email")).sendKeys(professor.email)
        await driver.findElement(By.id("password")).sendKeys(professor.password)
        //Check the terms and condition checkbox
        await driver.findElement(By.id("acceptedTerms")).click()
        //Click Next
        await driver.wait(until.elementLocated(By.className("sc-bZQynM bQXXNe")))
        await driver.sleep(1000)
        await driver.findElement(By.className("sc-bZQynM bQXXNe")).click()

        await driver.wait(until.elementLocated(By.className("skip-step-link__link")))
        await driver.sleep(500)
        await driver.findElement(By.className("skip-step-link__link")).click()

        await driver.wait(until.elementLocated(By.className("skip-step-link__link")))
        await driver.sleep(500)
        await driver.findElement(By.className("skip-step-link__link")).click()

        await driver.wait(until.elementLocated(By.className("sc-bZQynM bQXXNe")))
        await driver.findElement(By.className("sc-bZQynM bQXXNe")).click()
        await driver.sleep(500)
        await driver.wait(until.elementLocated(By.className("prepaid")))
        await driver.findElement(By.className("prepaid")).click()
        await driver.sleep(500)

        await driver.wait(until.elementLocated(By.id("subscription_code")))
        await driver.sleep(500)
        await driver.findElement(By.id("subscription_code")).sendKeys("usjixtedkigyus")

        let subscriptionForm = await driver.findElement(By.id("simple-modal"))
        await subscriptionForm.findElement(By.className("btn btn-primary")).click()

        await driver.wait(until.elementLocated(By.className("thank-you")))
        await driver.sleep(2000)
        return driver.close()


        return
     }, 2000 )
  } finally {
    console.log('ready')
  }
}

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