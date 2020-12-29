import { BugSplat } from "https://deno.land/x/bugsplat@v1.0.0/bugsplat.ts";

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
  await bugsplat.post(error);
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
