const fs = require("fs");
const csv = require("fast-csv");
const colors = require("colors");
const { Builder, By, Key, until, browser } = require("selenium-webdriver");

const stream = fs.createReadStream("data.csv");

let index = 0;
const ACCOUNTS = [];

console.log("Top Hat Support Account Creator".bold.blue);
console.log("-------------------------------");

const getAccounts = () => {
  csv
    .fromStream(stream, { headers: true })
    .on("data", function(data) {
      return ACCOUNTS.push(data);
    })
    .on("end", function() {
      sendOff();
    });
};

const sendOff = () => {
  console.log("Creating student trial accounts...".green.bold);
  //createStudentAccounts(ACCOUNTS)
  createStudentTrialAccounts(ACCOUNTS);
};

stream.on("error", err => {
  console.log("Error trying to open file:".red.bold);
  console.log(err);
  console.log("-------------------");
  console.log(
    "Make sure your file is named data.csv and is in this directory and try again"
      .green
  );
});

getAccounts();

const createStudentTrialAccounts = async function([professor, ...tail]) {
  if (index === 500 || index === ACCOUNTS.length - 1) {
    // maybe check if we're at the end of the list?
    console.log("---");
    console.log("Script completed at index".bold.yellow, index);
    return;
  }

  console.log("---");
  console.log(
    "[" +
      colors.bold.red(index) +
      "]" +
      " Creating account ".bold.yellow +
      professor.Email
  );

  let driver = await new Builder().forBrowser("firefox").build();

  try {
    const URL = `https://app.tophat.com/register/student/org/${
      professor.OrgId
    }/join_code/${professor.JoinCode}/info?source=course_link`;
    await driver.get(URL);
    await driver.wait(
      until.elementLocated(By.id("firstName"))
    );
    //Enter user information
    await driver.findElement(By.id("firstName")).sendKeys(professor.FirstName);
    await driver.findElement(By.id("lastName")).sendKeys(professor.LastName);
    await driver.findElement(By.id("email")).sendKeys(professor.Email);
    await driver.findElement(By.id("password")).sendKeys(professor.Password);
    //Check the terms and condition checkbox
    await driver.findElement(By.id("acceptedTerms")).click();
    // class for 7 day free trial
    await driver
      .wait(
        until.elementLocated(
          By.className("sc-1mdnioh-0-Buttonsstyles__ButtonBase-jkTCjP gBQMbH")
        ),
        5000
      )
      .then(
        async () => {
          // click 7 day free trial
          // class changes from time to time so this has to be manually changed when it does change
          await driver
            .findElement(
              By.className(
                "sc-1mdnioh-0-Buttonsstyles__ButtonBase-jkTCjP gBQMbH"
              )
            )
            .click();
          //Click Okay

          // click Yes to the free Trial modal
          await driver.executeScript(
            "document.querySelector('.modal_footer .sc-1mdnioh-0-Buttonsstyles__ButtonBase-dISeDz.laQOvo').click()"
          );

          console.log(
            "[" +
              colors.bold.red(index) +
              "]" +
              "Success! ".bold.green +
              "Account created: ".yellow +
              professor.Email
          );
          await driver.sleep(6000);
          await driver.quit();
          index++;
          return createStudentTrialAccounts(tail);
        },
        async data => {
          await driver.quit();
          return createStudentTrialAccounts([professor, ...tail]);
        }
      );
  } catch (error) {
    console.log(colors.red.bold(error));
  }
};
