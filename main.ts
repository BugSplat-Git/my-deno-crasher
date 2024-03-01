import { BugSplat } from 'https://esm.sh/bugsplat@8.0.1';

const description = "test crash from deno!";
const key = "en-US";
const email = "bobby@bugsplat.com";
const user = "Bobby";

const bugsplat = new BugSplat("Fred", "my-deno-crasher", "1.0");
bugsplat.setDefaultAppKey(key);
bugsplat.setDefaultDescription(description);
bugsplat.setDefaultEmail(email);
bugsplat.setDefaultUser(user);

try {
  generateExampleStackFrames();
} catch (error) {
  await bugsplat.post(error, getAdditionalOptionsWithLogFile());
}

function crash() {
  throw new Error("BugSplat rocks!");
}

function generateExampleStackFrames() {
  sampleStackFrame0();
}

function sampleStackFrame0() {
  sampleStackFrame1();
}

function sampleStackFrame1() {
  sampleStackFrame2();
}

function sampleStackFrame2() {
  crash();
}

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