[![bugsplat-github-banner-basic-outline](https://user-images.githubusercontent.com/20464226/149019306-3186103c-5315-4dad-a499-4fd1df408475.png)](https://bugsplat.com)
<br/>
# <div align="center">BugSplat</div> 
### **<div align="center">Crash and error reporting built for web developers.</div>**
<div align="center">
    <a href="https://twitter.com/BugSplatCo">
        <img alt="Follow @bugsplatco on Twitter" src="https://img.shields.io/twitter/follow/bugsplatco?label=Follow%20BugSplat&style=social">
    </a>
    <a href="https://discord.gg/K4KjjRV5ve">
        <img alt="Join BugSplat on Discord" src="https://img.shields.io/discord/664965194799251487?label=Join%20Discord&logo=Discord&style=social">
    </a>
</div>

# my-deno-crasher

This sample project demonstrates how to use the [bugsplat](https://github.com/BugSplat-Git/bugsplat-js) package to report TypeScript errors in [Deno](https://deno.com) applications. Before continuing with the tutorial please make sure you have completed the following checklist:

* [Sign Up](https://app.bugsplat.com/v2/sign-up) as a new BugSplat user.
* [Log In](https://app.bugsplat.com/cognito/login) using your email address.

## ⚙️ Integrating

Add an import from [bugsplat-js](https://github.com/BugSplat-Git/bugsplat-js) via [esm.sh](https://esm.sh/):

```typescript
import { BugSplat } from 'https://esm.sh/bugsplat@8.0.1';
```

Create a new instance of the `BugSplat` class with the name of your BugSplat database, the name of your application, and the version of your application:

```typescript
const bugsplat = new BugSplat('DatabaseName', 'AppName', '1.0.0');
```

Use the `bugsplat` instance to capture errors that originate inside of try-catch blocks:

```typescript
try {
  throw new Error("BugSplat");
} catch (error) {
  await bugsplat.post(error);
}
```

Use `bugsplat` to post errors from promise rejections:

```typescript
Promise.reject(new Error("BugSplat!")).catch(error => bugsplat.post(error, {}));
```

You can also attach a file to your error post by passing a `BugSplatOptions` object containing with a value for `additionalFormDataParams` property.

```typescript
await bugsplat.post(error, getAdditionalOptionsWithLogFile());

function getAdditionalOptionsWithLogFile() {
  const filename = 'log.txt';
  return {
    additionalFormDataParams: [{
      key: 'file',
      value: new File([Deno.readFileSync(filename)], filename),
      filename: filename,
    }],
  };
}
```

## 🧪 Sample

Clone the [my-deno-crasher](https://github.com/BugSplat-Git/my-deno-crasher) repository:

```bash
git clone https://github.com/BugSplat-Git/my-deno-crasher
```

Set your current directory to `my-deno-crasher`.

```bash
cd my-deno-crasher
```

Run the sample with the `--allow-net` and `--allow-read` flags to allow BugSplat to post an error to our backend and read the log file respectively.

```bash
deno run --allow-net --allow-read main.ts
```

## 📈 Viewing Reports

After posting an error, navigate to the [Crashes](https://app.bugsplat.com/v2/crashes) page. You should see a new crash report for the application you just configured. Click the link in the ID column to see details about your crash on the [Crashes](https://app.bugsplat.com/v2/crashes) page:

![Deno error reports](https://github.com/BugSplat-Git/my-deno-crasher/assets/2646053/a4505b1a-e5b7-45e0-bcea-98aa18cc85bd)

![Deno error report](https://github.com/BugSplat-Git/my-deno-crasher/assets/2646053/c4c8a574-e05b-4ce1-b5b4-63febce982dc)

That’s it! Your application is now configured to post error reports to BugSplat.

## API

In addition to the configuration demonstrated above, there are a few public methods that can be used to customize your BugSplat integration:

```typescript
bugsplat.setDefaultAppKey(appKey); // Additional metadata that can be queried via BugSplats web application
bugsplat.setDefaultUser(user); // The name or id of your user
bugsplat.setDefaultEmail(email); // The email of your user
bugsplat.setDefaultDescription(description); // Additional info about your crash that gets reset after every post
async bugsplat.post(error, options); // Posts an arbitrary Error object to BugSplat
// If the values options.appKey, options.user, options.email, options.description are set the corresponding default values will be overwritten
// Returns a promise that resolves with properties: error (if there was an error posting to BugSplat), response (the response from the BugSplat crash post API), and original (the error passed by bugsplat.post)
```

## Contributing

BugSplat loves open-source software! Please check out our project on [GitHub](https://github.com/BugSplat-Git/bugsplat-js) and send us a Pull Request.
