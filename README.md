A handy npm package to extract data from Ubisoft services by reverse-engineering their public web APIs.

<p align="center">
    <img alt="npm" src="https://img.shields.io/npm/dt/ubisoft-api?color=blue&logo=npm">
    <img alt="NPM" src="https://img.shields.io/npm/l/ubisoft-api?color=blue&logo=open-source-initiative&logoColor=white">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/scrip7/ubisoft-api?color=blue&logo=github">
</p>

## 📋 Table of contents
- [Introduction](#-introduction)
- [Features](#-features)
- [Supported Games](#-supported-games)
- [Installation](#️-installation)
- [Configuration](#-configuration)
- [Examples](#-examples)
    - [Search Ubisoft profiles](#search-ubisoft-profiles)
    - [Rainbow Six: Siege stats](#rainbow-six-siege-stats)
- [Useful resources](#-useful-resources)
- [Contacts](#-contacts)

### 📝 Introduction
Before using this package, you should know that Ubisoft **does not** provide any official APIs for developers to design and develop their own third-party applications directly.

So, where exactly do I get the data from?

The answer is simple; I fetch data by reverse-engineering Ubisoft web APIs (Which do not have any documentation), format, and restructure the responses and eventually return the new data to the user.

To access this data, you must provide some Ubisoft accounts (at least one account) which contains email and password to authenticate and work with their APIs.

Remember that two-step verification of the accounts must be **disabled**. Otherwise, this package won't work.

> **Do not** use your primary Ubisoft account.

If you **improperly** use API calls, your account might get a temporary penalty or permanent ban.

> We strongly recommend that you **create a new fake account**.

**We take no responsibility** for anything that might happen to the provided accounts in the future.

The Ubisoft APIs that we use in this package **are not stable**. Your application might suddenly break if Ubisoft changes something in the future, so you must always keep your application up-to-date.

There are multiple **third-party** non-open source websites/services out there that provide APIs related to Ubisoft services. For several reasons, we advise you not to use them:
- It is wrong to build an application that relies heavily on many third-party services.
- To get data, they all use the same method I described above.
- They are not trustworthy, and it's hard to trust them.
- You will never know what they do with the data.
- They always have the power to manipulate the data before delivering it to you.


### 🚀 Features
- Includes [TypeScript](https://www.typescriptlang.org/) definitions
- Supports multiple Ubisoft accounts (multiple sessions)
- Supports HTTP or HTTPS proxy for outgoing requests
- Search Ubisoft profiles (by username, profile id, user id, etc...)
- Check Ubisoft username availability
- Get users profile picture in different sizes


### 💪🏻 Supported Games
- [ ] Tom Clancy's Rainbow Six: Siege **(Work in progress...)**


### ⬇️ Installation
Using npm:
```bash
$ npm install ubisoft-api
```

Using yarn:
```bash
$ yarn add ubisoft-api
```

### 🔧 Configuration
We highly recommend you to use [TypeScript](https://www.typescriptlang.org/) instead of CommonJS.
```JavaScript
// CommonJS
// const Ubisoft = require('ubisoft-api');
 
// ES6
import Ubisoft from 'ubisoft-api';

const ubisoft = new Ubisoft({
    accounts: [
        {
            email: '...',
            password: '...'
        },
        // Optional: Add more Ubisoft accounts...
    ],
    sessionPath: __dirname + '/sessions.json',

    /**
     * Optional:
     *  Pass HTTP or HTTPS proxy server for outgoing requests
     * 
     * Example:
     *  http(s)://user:pass@host:port
     */
    // proxy: '',
});
```

### 📖 Examples

#### Search Ubisoft profiles
You can search **up to 50** Ubisoft profiles in a single call.

> This restriction is set by Ubisoft and may change in the future.

```JavaScript
/**
 * ===========================
 * Search profiles by username
 * ===========================
 */

ubisoft.searchByUsername('uplay', 'Sub.Script')
    // .searchByUsername('uplay', ['Sub.Script', 'Beaulo.TSM'])
    .then((profiles) => {
        console.log(profiles.toArray());
    })


/**
 * ============================
 * Search profiles by profileId
 * ============================
 */
ubisoft.searchByProfileId('4503086f-112e-41b6-bdbf-1c682596bab3')
    /*
    .searchByProfileId('uplay', [
        '4503086f-112e-41b6-bdbf-1c682596bab3' // Sub.Script
        '3cc51897-49c4-45f6-af9d-66507b8ef0e1' // Beaulo.TSM
        '36e684d7-5a57-42df-9b00-1c60e7c91f28' // Achieved.TSM
    ])
    */
    .then((profiles) => {
        console.log(profiles.toArray());
    })
```
Output:
```JSON
[
  {
    "id": "4503086f-112e-41b6-bdbf-1c682596bab3",
    "userId": "4503086f-112e-41b6-bdbf-1c682596bab3",
    "name": "Sub.Script",
    "platform": "uplay",
    "platformId": "4503086f-112e-41b6-bdbf-1c682596bab3"
  }
]
```

Just because you got some results after searching profiles, it does not mean that you will always receive "game stats" for all the available games. 

In fact, if the profiles don't own the game or have never played the game before, most likely Ubisoft will return an empty response then you will get an error.

> For example:
> 
> If you request to get Siege information for a profile, you'll likely receive an error or an empty response if that profile does not own the Siege or has never played it before.

So, I highly recommend you to validate the responses after each call.


#### Rainbow Six: Siege stats

Siege Progress:
```JavaScript
ubisoft.searchByUsername('uplay', 'Sub.Script')
    .then((profiles) => {
        profiles.siege.progress().then(data => {
            console.log(data.first());
        })
    })
```
Output:
```JSON
{
  "profile": {
    "id": "4503086f-112e-41b6-bdbf-1c682596bab3",
    "userId": "4503086f-112e-41b6-bdbf-1c682596bab3",
    "name": "Sub.Script",
    "platform": "uplay",
    "platformId": "4503086f-112e-41b6-bdbf-1c682596bab3"
  },
  "progress": {
    "alphapack": 4.6,
    "xp": {
      "level": 564,
      "current": 58656,
      "max": 273500,
      "percentage": 21.45
    }
  }
}
```


### 🔗 Useful resources
- [Rainbow Six: Siege operator icons](https://r6operators.marcopixel.eu/) - [Github](https://github.com/marcopixel/r6operators)
- [Ubisoft account](https://account.ubisoft.com/) for creating new Ubisoft account(s).


### 📞 Contacts
If you have any questions regarding this package, feel free to be in touch with me!

Discord: `Script#0001`

Twitter: [@Skr1p7](https://twitter.com/intent/user?screen_name=Skr1p7)
