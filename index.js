// const express = require("express");
// const bot = require("./config/telegramBot");
// const { getImageBuffer } = require("./utils/getImageBuffer");
// const randomPattern = require("./utils/randomPattern");
// const { formatDate } = require("./utils/formatDate");

// const app = express();
// const port = 3000;

// const userStates = {}; // Object to track the state of each user

// bot.onText(/\/start/, async (msg) => {
//   const activeChatId = msg.from.id;

//   console.log(msg);

//   // Reset the user's state when they click start
//   userStates[activeChatId] = {
//     active: true, // Mark the user as active
//     answeredCallback: false, // Track if the callback for this user has been answered
//     answeredCallbackQueryId: null, // Store the callback query ID to track answered queries
//     waitingForSeed: false, // Track if the user is waiting for the server seed
//     validSeedEntered: false, // Track if the user has entered a valid server seed
//     waitingForBetAmount: false, // Track if the user is waiting for bet amount
//     lastClickedButton: null, // Track if the user is waiting for bet amount
//   };

//   // Send a message with a new inline button
//   bot.sendMessage(activeChatId, "Start STAKE MINES Predictor ⏭️", {
//     reply_markup: {
//       inline_keyboard: [
//         [
//           {
//             text: "Click Here To Start 🚀",
//             callback_data: "start_premium_button",
//           },
//         ],
//       ],
//     },
//   });
// });

// // Callback query handler for button clicks 2-12
// bot.on("callback_query", (callbackQuery) => {
//   const activeChatId = callbackQuery.from.id;
//   const callbackData = callbackQuery.data;

//   // Prevent handling if it's the same callback query ID or if we already handled this query
//   if (userStates[activeChatId]?.answeredCallbackQueryId === callbackQuery.id) {
//     return; // Skip if this callback query has already been answered
//   }

//   // Mark the query as answered
//   userStates[activeChatId].answeredCallbackQueryId = callbackQuery.id;

//   let responseMessage;
//   // Handle the callback queries (buttons 2-12)
//   switch (callbackData) {
//     case "start_premium_button":
//       bot.sendMessage(activeChatId, "Select Your Mines 💣", {
//         reply_markup: {
//           inline_keyboard: [
//             [{ text: "2", callback_data: "button_2" }],
//             [{ text: "3", callback_data: "button_3" }],
//             [{ text: "4", callback_data: "button_4" }],
//             [{ text: "5", callback_data: "button_5" }],
//             [{ text: "6", callback_data: "button_6" }],
//             [{ text: "7", callback_data: "button_7" }],
//             [{ text: "8", callback_data: "button_8" }],
//             [{ text: "9", callback_data: "button_9" }],
//             [{ text: "10", callback_data: "button_10" }],
//             [{ text: "11", callback_data: "button_11" }],
//             [{ text: "12", callback_data: "button_12" }],
//           ],
//         },
//       });
//       return; // Prevent further processing for this button click

//     case "button_2":
//       responseMessage = 2;
//       break;
//     case "button_3":
//       responseMessage = 3;
//       break;
//     case "button_4":
//       responseMessage = 4;
//       break;
//     case "button_5":
//       responseMessage = 5;
//       break;
//     case "button_6":
//       responseMessage = 6;
//       break;
//     case "button_7":
//       responseMessage = 7;
//       break;
//     case "button_8":
//       responseMessage = 8;
//       break;
//     case "button_9":
//       responseMessage = 9;
//       break;
//     case "button_10":
//       responseMessage = 10;
//       break;
//     case "button_11":
//       responseMessage = 11;
//       break;
//     case "button_12":
//       responseMessage = 12;
//       break;

//     default:
//       responseMessage = null;
//       return; // Ignore unknown buttons
//   }

//   // Respond to the user only once, to avoid multiple executions
//   bot
//     .answerCallbackQuery(callbackQuery.id)
//     .then(() => {
//       const imageBuffer = getImageBuffer("images/server-seed.jpg");
//       bot.sendPhoto(activeChatId, imageBuffer);
//       // Send the message only once to avoid sending multiple messages
//       // bot.sendMessage(activeChatId, responseMessage);

//       userStates[activeChatId].lastClickedButton = responseMessage;

//       // Now that the user has selected a button, show the instructional messages only once
//       const messages = [
//         `𝗜𝗳 𝘆𝗼𝘂 𝗱𝗼𝗻’𝘁 𝗸𝗻𝗼𝘄 𝗵𝗼𝘄 𝘁𝗼 𝗴𝗲𝗧 𝗮𝗰𝗧𝗶𝗩𝗲 𝗦𝗲𝗲𝗿 𝗦𝗲𝗲𝗱, 𝗰𝗵𝗲𝗰𝗸 𝗳𝗶𝗿𝘀𝘁 𝗩𝗶𝗱𝗲𝗼 I uploaded 🚨`,
//         `𝗙𝗶𝗻𝗱 𝘆𝗼𝘂𝗿 (𝗔𝗰𝘁𝗶𝗩𝗲 𝗦𝗲𝗲𝗿 𝗦𝗲𝗲𝗱) 𝗮𝗻𝗱 𝗽𝗮𝘀𝘁𝗲 𝗶𝘁 𝗵𝗲𝗿𝗲`,
//         `⬇️`,
//       ];

//       let delay = 100;
//       messages.forEach((msg, index) => {
//         setTimeout(() => {
//           bot.sendMessage(activeChatId, msg); // Send the message only to the specific user
//         }, delay);
//         delay += 250;
//       });

//       // After completing the user's interaction, reset the callback state to prevent re-answering the same callback
//       userStates[activeChatId].answeredCallbackQueryId = null;
//       userStates[activeChatId].waitingForSeed = true; // Now we expect the server seed input
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// // Handler for incoming messages (where the user will enter server seed)
// bot.on("message", async (msg) => {
//   const activeChatId = msg.from.id;
//   const text = msg.text;

//   // Check if the user is currently waiting for the server seed
//   if (userStates[activeChatId]?.waitingForSeed) {
//     // Validate the server seed
//     if (text === "/start") {
//       return;
//     } else if (text.length === 64) {
//       const imageBuffer = getImageBuffer("/images/bet-amount.jpg");
//       const caption = `Bet amount 💰`;

//       bot.sendPhoto(activeChatId, imageBuffer, { caption });

//       setTimeout(() => {
//         bot.sendMessage(activeChatId, "Enter the [ Bet amount ] here 💵");
//       }, 500);

//       setTimeout(() => {
//         bot.sendMessage(activeChatId, "⬇️");
//         userStates[activeChatId].validSeedEntered = true; // Mark seed as valid
//         userStates[activeChatId].waitingForSeed = false; // Stop waiting for further input
//         userStates[activeChatId].waitingForBetAmount = true; // Start waiting for bet amount
//       }, 800);
//     } else {
//       bot.sendMessage(activeChatId, "Server seed incorrect. Please try again.");
//       // Allow the user to re-enter the server seed
//     }
//   }

//   // // Optionally, if the seed is already valid, prevent any more input
//   // if (userStates[activeChatId]?.validSeedEntered) {
//   //   return; // Stop processing further input if the seed is valid
//   // }

//   // Check if the user is entering a bet amount
//   if (userStates[activeChatId]?.waitingForBetAmount) {
//     // Regular expression to check for valid bet amount format (numbers, commas, or dots)
//     const betAmountRegex = /^[0-9]+([.,][0-9]+)?$/;

//     // // Ensure that the user has not already entered a valid bet amount
//     // if (userStates[activeChatId].validBetAmount) {
//     //   return; // If the bet amount has been validated already, stop further processing
//     // }

//     console.log(`Checking bet amount: ${text}`);

//     if (text === "/start") {
//       return;
//     } else if (betAmountRegex.test(text)) {
//       // Send the valid bet amount back to the user
//       bot.sendMessage(activeChatId, "Loading...");
//       console.log("Loading..", userStates[activeChatId].lastClickedButton);
//       const lastClickedButton = userStates[activeChatId].lastClickedButton;

//       const image = await randomPattern(lastClickedButton);

//       const imageBuffer = getImageBuffer("patterns/" + image);

//       const currentDate = formatDate();

//       // setTimeout(() => {
//       bot.sendPhoto(activeChatId, imageBuffer, {
//         caption: `<b>GAME</b> 0 💎   ${currentDate}`,
//         parse_mode: "HTML",
//       });
//       // }, 500);

//       // Mark the bet amount as valid in the user states
//       userStates[activeChatId].validBetAmount = true;

//       // Stop waiting for further bet amount input
//       userStates[activeChatId].waitingForBetAmount = false;
//     } else {
//       // Send a message indicating the bet amount is incorrect
//       bot.sendMessage(
//         activeChatId,
//         "Incorrect bet amount. Please enter a valid amount (numbers, commas, or dots)."
//       );
//     }
//   }
// });

// app.listen(port, () => {
//   console.log("App is listening at port: " + port);
// });

// const express = require("express");
// const bot = require("./config/telegramBot");
// const { getImageBuffer } = require("./utils/getImageBuffer");
// const randomPattern = require("./utils/randomPattern");
// const { formatDate } = require("./utils/formatDate");
// const { isValidUser, createNewKey } = require("./controllers/key");
// const cors = require("cors");
// const connectDB = require("./config/database");

// const app = express();
// const port = 3000;

// app.use(express.json());

// app.use(cors({ origin: "*" }));

// app.post("/api/v1/premium-key/generate", createNewKey);

// const userStates = {}; // Object to track the state of each user

// bot.onText(/\/start/, async (msg) => {
//   const activeChatId = msg.from.id;
//   const username = msg.from.username;

//   const existingUser = await isValidUser(activeChatId);

//   console.log(existingUser);
//   console.log(activeChatId);

//   if (existingUser.status) {
//     // Reset the user's state when they click start
//     userStates[activeChatId] = {
//       active: true, // Mark the user as active
//       answeredCallback: false, // Track if the callback for this user has been answered
//       answeredCallbackQueryId: null, // Store the callback query ID to track answered queries
//       waitingForSeed: false, // Track if the user is waiting for the server seed
//       validSeedEntered: false, // Track if the user has entered a valid server seed
//       waitingForBetAmount: false, // Track if the user is waiting for bet amount
//       lastClickedButton: null, // Track if the user is waiting for bet amount
//     };

//     // Send a message with a new inline button
//     bot.sendMessage(activeChatId, "Start STAKE MINES Predictor ⏭️", {
//       reply_markup: {
//         inline_keyboard: [
//           [
//             {
//               text: "Click Here To Start 🚀",
//               callback_data: "start_premium_button",
//             },
//           ],
//         ],
//       },
//     });
//   } else {
//     const formattedTime = formatDate();

//     const message = `<b>Hello 👋 @${username}</b>\n
// <b>Welcome to MinesPro bot</b>\n
// <i>Owner User - ( @owner )</i> <b>Need Key? Connect here</b>\n
// ${formattedTime}\n
// <b>Click On The Button To Enter Your Key ⬇️</b>
//       `;

//     const options = {
//       parse_mode: "HTML",
//       reply_markup: {
//         inline_keyboard: [
//           [
//             {
//               text: "Enter Key 🔑",
//               callback_data: "key_entry_button",
//             },
//           ],
//         ],
//       },
//     };

//     bot.sendMessage(activeChatId, message, options);
//   }
// });

// // Callback query handler for button clicks 2-12
// bot.on("callback_query", (callbackQuery) => {
//   const activeChatId = callbackQuery.from.id;
//   const callbackData = callbackQuery.data;

//   // Prevent handling if it's the same callback query ID or if we already handled this query
//   if (userStates[activeChatId]?.answeredCallbackQueryId === callbackQuery.id) {
//     return; // Skip if this callback query has already been answered
//   }

//   // Mark the query as answered
//   userStates[activeChatId].answeredCallbackQueryId = callbackQuery.id;

//   let responseMessage;
//   // Handle the callback queries (buttons 2-12)
//   switch (callbackData) {
//     case "start_premium_button":
//       bot.sendMessage(activeChatId, "Select Your Mines 💣", {
//         reply_markup: {
//           inline_keyboard: [
//             [{ text: "2", callback_data: "button_2" }],
//             [{ text: "3", callback_data: "button_3" }],
//             [{ text: "4", callback_data: "button_4" }],
//             [{ text: "5", callback_data: "button_5" }],
//             [{ text: "6", callback_data: "button_6" }],
//             [{ text: "7", callback_data: "button_7" }],
//             [{ text: "8", callback_data: "button_8" }],
//             [{ text: "9", callback_data: "button_9" }],
//             [{ text: "10", callback_data: "button_10" }],
//             [{ text: "11", callback_data: "button_11" }],
//             [{ text: "12", callback_data: "button_12" }],
//           ],
//         },
//       });
//       return; // Prevent further processing for this button click

//     case "button_2":
//       responseMessage = 2;
//       break;
//     case "button_3":
//       responseMessage = 3;
//       break;
//     case "button_4":
//       responseMessage = 4;
//       break;
//     case "button_5":
//       responseMessage = 5;
//       break;
//     case "button_6":
//       responseMessage = 6;
//       break;
//     case "button_7":
//       responseMessage = 7;
//       break;
//     case "button_8":
//       responseMessage = 8;
//       break;
//     case "button_9":
//       responseMessage = 9;
//       break;
//     case "button_10":
//       responseMessage = 10;
//       break;
//     case "button_11":
//       responseMessage = 11;
//       break;
//     case "button_12":
//       responseMessage = 12;
//       break;

//     default:
//       responseMessage = null;
//       return; // Ignore unknown buttons
//   }

//   // Respond to the user only once, to avoid multiple executions
//   bot
//     .answerCallbackQuery(callbackQuery.id)
//     .then(() => {
//       const imageBuffer = getImageBuffer("images/server-seed.jpg");
//       bot.sendPhoto(activeChatId, imageBuffer);
//       // Send the message only once to avoid sending multiple messages
//       // bot.sendMessage(activeChatId, responseMessage);

//       userStates[activeChatId].lastClickedButton = responseMessage;

//       // Now that the user has selected a button, show the instructional messages only once
//       const messages = [
//         `𝗜𝗳 𝘆𝗼𝘂 𝗱𝗼𝗻’𝘁 𝗸𝗻𝗼𝘄 𝗵𝗼𝘄 𝘁𝗼 𝗴𝗲𝗧 𝗮𝗰𝗧𝗶𝗩𝗲 𝗦𝗲𝗲𝗿 𝗦𝗲𝗲𝗱, 𝗰𝗵𝗲𝗰𝗸 𝗳𝗶𝗿𝘀𝘁 𝗩𝗶𝗱𝗲𝗼 I uploaded 🚨`,
//         `𝗙𝗶𝗻𝗱 𝘆𝗼𝘂𝗿 (𝗔𝗰𝘁𝗶𝗩𝗲 𝗦𝗲𝗲𝗿 𝗦𝗲𝗲𝗱) 𝗮𝗻𝗱 𝗽𝗮𝘀𝘁𝗲 𝗶𝘁 𝗵𝗲𝗿𝗲`,
//         `⬇️`,
//       ];

//       let delay = 100;
//       messages.forEach((msg, index) => {
//         setTimeout(() => {
//           bot.sendMessage(activeChatId, msg); // Send the message only to the specific user
//         }, delay);
//         delay += 250;
//       });

//       // After completing the user's interaction, reset the callback state to prevent re-answering the same callback
//       userStates[activeChatId].answeredCallbackQueryId = null;
//       userStates[activeChatId].waitingForSeed = true; // Now we expect the server seed input
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// // Handler for incoming messages (where the user will enter server seed)
// bot.on("message", async (msg) => {
//   const activeChatId = msg.from.id;
//   const text = msg.text;

//   // Check if the user is currently waiting for the server seed
//   if (userStates[activeChatId]?.waitingForSeed) {
//     // Validate the server seed
//     if (text === "/start") {
//       return;
//     } else if (text.length === 64) {
//       const imageBuffer = getImageBuffer("/images/bet-amount.jpg");
//       const caption = `Bet amount 💰`;

//       bot.sendPhoto(activeChatId, imageBuffer, { caption });

//       setTimeout(() => {
//         bot.sendMessage(activeChatId, "Enter the [ Bet amount ] here 💵");
//       }, 500);

//       setTimeout(() => {
//         bot.sendMessage(activeChatId, "⬇️");
//         userStates[activeChatId].validSeedEntered = true; // Mark seed as valid
//         userStates[activeChatId].waitingForSeed = false; // Stop waiting for further input
//         userStates[activeChatId].waitingForBetAmount = true; // Start waiting for bet amount
//       }, 800);
//     } else {
//       bot.sendMessage(activeChatId, "Server seed incorrect. Please try again.");
//       // Allow the user to re-enter the server seed
//     }
//   }

//   // // Optionally, if the seed is already valid, prevent any more input
//   // if (userStates[activeChatId]?.validSeedEntered) {
//   //   return; // Stop processing further input if the seed is valid
//   // }

//   // Check if the user is entering a bet amount
//   if (userStates[activeChatId]?.waitingForBetAmount) {
//     // Regular expression to check for valid bet amount format (numbers, commas, or dots)
//     const betAmountRegex = /^[0-9]+([.,][0-9]+)?$/;

//     // // Ensure that the user has not already entered a valid bet amount
//     // if (userStates[activeChatId].validBetAmount) {
//     //   return; // If the bet amount has been validated already, stop further processing
//     // }

//     console.log(`Checking bet amount: ${text}`);

//     if (text === "/start") {
//       return;
//     } else if (betAmountRegex.test(text)) {
//       // Send the valid bet amount back to the user
//       bot.sendMessage(activeChatId, "Loading...");
//       console.log("Loading..", userStates[activeChatId].lastClickedButton);
//       const lastClickedButton = userStates[activeChatId].lastClickedButton;

//       const image = await randomPattern(lastClickedButton);

//       const imageBuffer = getImageBuffer("patterns/" + image);

//       const currentDate = formatDate();

//       // setTimeout(() => {
//       bot.sendPhoto(activeChatId, imageBuffer, {
//         caption: `<b>GAME</b> 0 💎   ${currentDate}`,
//         parse_mode: "HTML",
//       });
//       // }, 500);

//       // Mark the bet amount as valid in the user states
//       userStates[activeChatId].validBetAmount = true;

//       // Stop waiting for further bet amount input
//       userStates[activeChatId].waitingForBetAmount = false;
//     } else {
//       // Send a message indicating the bet amount is incorrect
//       bot.sendMessage(
//         activeChatId,
//         "Incorrect bet amount. Please enter a valid amount (numbers, commas, or dots)."
//       );
//     }
//   }
// });

// connectDB()
//   .then(() => {
//     app.listen(port, () => {
//       console.log("App is listening at port: " + port);
//     });
//   })
//   .catch((error) => {
//     console.log("Error", error?.message);
//   });

const express = require("express");
const bot = require("./config/telegramBot");
const { getImageBuffer } = require("./utils/getImageBuffer");
const randomPattern = require("./utils/randomPattern");
const { formatDate } = require("./utils/formatDate");
const {
 isValidUser,
 createNewKey,
 validateKey,
 increaseCount,
} = require("./controllers/key"); // Import validateKey
const cors = require("cors");
const connectDB = require("./config/database");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({ origin: process.env.ADMIN_DOMAIN }));

app.post("/api/v1/premium-key/generate", createNewKey);

const userStates = {}; // Object to track the state of each user

bot.onText(/\/start/, async (msg) => {
 const activeChatId = msg.from.id;
 const username = msg.from.username;

 const existingUser = await isValidUser(activeChatId);

 console.log(existingUser);
 console.log(activeChatId);

 // Reset the user's state when they click start
 userStates[activeChatId] = {
  active: true,
  answeredCallback: false,
  answeredCallbackQueryId: null,
  waitingForSeed: false,
  validSeedEntered: false,
  waitingForBetAmount: false,
  lastClickedButton: null,
  waitingForKey: false, // Reset waiting for key state
 };

 if (existingUser.status) {
  // Send a message with a new inline button
  bot.sendMessage(activeChatId, "Start STAKE MINES Predictor ⏭️", {
   reply_markup: {
    inline_keyboard: [
     [
      {
       text: "Click Here To Start 🚀",
       callback_data: "start_premium_button",
      },
     ],
    ],
   },
  });
 } else {
  const formattedTime = formatDate();

  const message = `<b>Hello 👋 @${username}</b>\n
𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝗧𝗼 𝗦𝘁𝗮𝗸𝗲 𝗠𝗶𝗻𝗲𝗿  𝗕𝗼𝘁 🤖

𝗪𝗶𝗻 𝗣𝗿𝗼𝗯𝗮𝗯𝗶𝗹𝗶𝘁𝘆 𝟵𝟵.𝟵𝟴% 🚀
    
𝗬𝗼𝘂 𝗡𝗲𝗲𝗱 𝗞𝗲𝘆? 𝗖𝗼𝗻𝗻𝗲𝗰𝘁 𝗵𝗲𝗿𝗲 𝗢𝘄𝗻𝗲𝗿 𝗨𝘀𝗲𝗿 - ( @StakeyRich )
    
${formattedTime}\n
<b>Click The Button To Enter Your Key   ⬇️</b>
      `;

  const options = {
   parse_mode: "HTML",
   reply_markup: {
    inline_keyboard: [
     [
      {
       text: "Enter Key 🔑",
       callback_data: "key_entry_button",
      },
     ],
    ],
   },
  };

  bot.sendMessage(activeChatId, message, options);
 }
});

// Callback query handler for button clicks
bot.on("callback_query", (callbackQuery) => {
 const activeChatId = callbackQuery.from.id;
 const callbackData = callbackQuery.data;

 // Prevent handling if it's the same callback query ID or if we already handled this query
 if (userStates[activeChatId]?.answeredCallbackQueryId === callbackQuery.id) {
  return; // Skip if this callback query has already been answered
 }

 // Mark the query as answered
 userStates[activeChatId].answeredCallbackQueryId = callbackQuery.id;

 let responseMessage;
 // Handle the callback queries
 switch (callbackData) {
  case "start_premium_button":
   bot.sendMessage(activeChatId, "Select Your Mines 💣", {
    reply_markup: {
     inline_keyboard: [
      [{ text: "2", callback_data: "button_2" }],
      [{ text: "3", callback_data: "button_3" }],
      [{ text: "4", callback_data: "button_4" }],
      [{ text: "5", callback_data: "button_5" }],
      [{ text: "6", callback_data: "button_6" }],
      [{ text: "7", callback_data: "button_7" }],
      [{ text: "8", callback_data: "button_8" }],
      [{ text: "9", callback_data: "button_9" }],
      [{ text: "10", callback_data: "button_10" }],
      [{ text: "11", callback_data: "button_11" }],
      [{ text: "12", callback_data: "button_12" }],
     ],
    },
   });
   return; // Prevent further processing for this button click

  case "key_entry_button":
   bot.sendMessage(activeChatId, "🔑 𝗣𝗹𝗲𝗮𝘀𝗲 𝗲𝗻𝘁𝗲𝗿 𝘆𝗼𝘂𝗿 𝗸𝗲𝘆:");
   userStates[activeChatId].waitingForKey = true; // Set state to wait for key input
   return;

  // Handle other button cases (2-12)
  case "button_2":
   responseMessage = 2;
   break;
  case "button_3":
   responseMessage = 3;
   break;
  case "button_4":
   responseMessage = 4;
   break;
  case "button_5":
   responseMessage = 5;
   break;
  case "button_6":
   responseMessage = 6;
   break;
  case "button_7":
   responseMessage = 7;
   break;
  case "button_8":
   responseMessage = 8;
   break;
  case "button_9":
   responseMessage = 9;
   break;
  case "button_10":
   responseMessage = 10;
   break;
  case "button_11":
   responseMessage = 11;
   break;
  case "button_12":
   responseMessage = 12;
   break;

  default:
   responseMessage = null;
   return; // Ignore unknown buttons
 }

 // Respond to the user only once, to avoid multiple executions
 bot
  .answerCallbackQuery(callbackQuery.id)
  .then(() => {
   const imageBuffer = getImageBuffer("images/server-seed.jpg");
   bot.sendPhoto(activeChatId, imageBuffer);
   userStates[activeChatId].lastClickedButton = responseMessage;

   // Instructional messages
   const messages = [
    // `𝗜𝗳 𝘆𝗼𝘂 𝗱𝗼𝗻’𝘁 𝗸𝗻𝗼𝘄 𝗵𝗼𝘄 𝘁𝗼 𝗴𝗲𝗧 𝗮𝗰𝗧𝗶𝗩𝗲 𝗦𝗲𝗲𝗿 𝗦𝗲𝗲𝗱, 𝗰𝗵𝗲𝗰𝗸 𝗳𝗶𝗿𝘀𝘁 𝗩𝗶𝗱𝗲𝗼 I uploaded 🚨`,
    `𝗙𝗶𝗻𝗱 𝘆𝗼𝘂𝗿 (𝗔𝗰𝘁𝗶𝗩𝗲 𝗦𝗲𝗲𝗿 𝗦𝗲𝗲𝗱) 𝗮𝗻𝗱 𝗽𝗮𝘀𝘁𝗲 𝗶𝘁 𝗵𝗲𝗿𝗲`,
    `⬇️`,
   ];

   let delay = 100;
   messages.forEach((msg, index) => {
    setTimeout(() => {
     bot.sendMessage(activeChatId, msg);
    }, delay);
    delay += 250;
   });

   userStates[activeChatId].answeredCallbackQueryId = null;
   userStates[activeChatId].waitingForSeed = true; // Now we expect the server seed input
  })
  .catch((err) => {
   console.log(err);
  });
});

// Handler for incoming messages (where the user will enter server seed or key)
bot.on("message", async (msg) => {
 const activeChatId = msg.from.id;
 const text = msg.text;
 const userName = msg.from.username;

 // Check if the user is currently waiting for the server seed
 if (userStates[activeChatId]?.waitingForSeed) {
  // Validate the server seed
  if (text === "/start") {
   return;
  } else if (text.length === 64) {
   const imageBuffer = getImageBuffer("/images/bet-amount.jpg");
   const caption = `𝗕𝗲𝘁 𝗮𝗺𝗼𝘂𝗻𝘁 💰`;

   bot.sendPhoto(activeChatId, imageBuffer, { caption });

   setTimeout(() => {
    bot.sendMessage(activeChatId, "𝗘𝗻𝘁𝗲𝗿 𝘁𝗵𝗲 [ 𝗕𝗲𝘁 𝗮𝗺𝗼𝘂𝗻𝘁 ] 𝗵𝗲𝗿𝗲 💵");
   }, 500);

   setTimeout(() => {
    bot.sendMessage(activeChatId, "⬇️");
    userStates[activeChatId].validSeedEntered = true; // Mark seed as valid
    userStates[activeChatId].waitingForSeed = false; // Stop waiting for further input
    userStates[activeChatId].waitingForBetAmount = true; // Start waiting for bet amount
   }, 800);
  } else {
   bot.sendMessage(activeChatId, "❌ 𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗦𝗲𝗿𝘃𝗲𝗿 𝗦𝗲𝗲𝗱 & 𝗧𝗿𝘆 𝗔𝗴𝗮𝗶𝗻");
  }
 }

 // Check if the user is entering a key
 if (userStates[activeChatId]?.waitingForKey) {
  if (text === "/start") {
   return; // Ignore if the user restarts the bot
  }

  // const isValidKey = await validateKey(text); // Validate the key
  const isValidKey = await validateKey(activeChatId, text); // Validate the key

  if (isValidKey) {
   bot.sendMessage(
    activeChatId,
    `𝗖𝗼𝗻𝗴𝗿𝗮𝘁𝘂𝗹𝗮𝘁𝗶𝗼𝗻 🎉

𝗗𝗲𝗮𝗿 𝗨𝘀𝗲𝗿 - @${userName}
      
𝗬𝗼𝘂𝗿 𝗞𝗲𝘆 𝗜𝘀 𝗖𝗼𝗿𝗿𝗲𝗰𝘁 𝗬𝗼𝘂 𝗔𝗿𝗲 𝗔𝗱𝗱𝗲𝗱 𝗩𝗜𝗣 𝗠𝗲𝗺𝗯𝗲𝗿𝘀 ✅
      `
   );
   userStates[activeChatId].waitingForKey = false; // Stop waiting for key input
  } else {
   // bot.sendMessage(activeChatId, "❌ 𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗸𝗲𝘆! 𝗣𝗹𝗲𝗮𝘀𝗲 𝘁𝗿𝘆 𝗮𝗴𝗮𝗶𝗻.");
   bot.sendMessage(activeChatId, "❌ 𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗸𝗲𝘆! 𝗣𝗹𝗲𝗮𝘀𝗲 𝘁𝗿𝘆 𝗮𝗴𝗮𝗶𝗻.", {
    reply_markup: {
     inline_keyboard: [
      [
       {
        text: "Purchase key 🚀",
        url: "https://t.me/stakeyrich",
       },
      ],
     ],
    },
   });
   // Allow the user to re-enter the key
  }
 }

 // Check if the user is entering a bet amount
 if (userStates[activeChatId]?.waitingForBetAmount) {
  const betAmountRegex = /^[0-9]+([.,][0-9]+)?$/;

  if (text === "/start") {
   return;
  } else if (betAmountRegex.test(text)) {
   bot.sendMessage(activeChatId, "Lᴏᴀᴅɪɴɢ...");
   console.log("Loading..", userStates[activeChatId].lastClickedButton);
   const lastClickedButton = userStates[activeChatId].lastClickedButton;

   const image = await randomPattern(lastClickedButton);
   const imageBuffer = getImageBuffer("patterns/" + image);
   const currentDate = formatDate();

   const counter = await increaseCount(activeChatId);

   setTimeout(() => {
    bot.sendPhoto(activeChatId, imageBuffer, {
     caption: `<b>GAME</b> ${
      counter?.status ? counter?.data?.imageOpenedCount : 1
     } 💎   ${currentDate} 
          
𝗪𝗶𝗻 𝗣𝗿𝗼𝗯𝗮𝗯𝗶𝗹𝗶𝘁𝘆 𝟵𝟵.𝟵𝟴% 🚀`,
     parse_mode: "HTML",
    });
   }, 1000);

   userStates[activeChatId].validBetAmount = true;
   userStates[activeChatId].waitingForBetAmount = false;
  } else {
   bot.sendMessage(
    activeChatId,
    `❌ 𝗕𝗲𝘁 𝗮𝗺𝗼𝘂𝗻𝘁 𝗶𝘀 𝗻𝗼𝘁 𝘃𝗮𝗹𝗶𝗱!`
    // "Incorrect bet amount. Please enter a valid amount (numbers, commas, or dots)."
   );
  }
 }
});

connectDB()
 .then(() => {
  app.listen(port, () => {
   console.log("App is listening at port: " + port);
  });
 })
 .catch((error) => {
  console.log("Error", error?.message);
 });
