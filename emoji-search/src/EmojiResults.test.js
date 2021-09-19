import { render, screen } from '@testing-library/react';
import React from "react";
import ReactDOM from "react-dom";
import userEvent from '@testing-library/user-event';
import { describe } from 'yargs';
import EmojiResults from "./EmojiResults";
import filterEmoji from './filterEmoji';
import Header from "./Header";

it("emoji renders without crashing", () => {
  const div = [{title:"çok gülen adam",symbol:":))"}]

        render(  <EmojiResults emojiData={div} />);
  const contactNames =screen.getByText("çok gülen adam");

  const fakeContactNames = div.map(c => c.title)
  expect(contactNames.textContent).toEqual(fakeContactNames[0])
});

describe("filtered test",()=>{
  let emojies;

  beforeEach(()=>{
    emojies= filterEmoji("smile",20);

});
  test('should correct length', () => {
   
   
    
     expect(emojies.length).toEqual(20);
     
   });
   test('should true', () => {

     const exist= emojies.some(emoji=>{
       return !(emoji.title.toLocaleLowerCase().includes("smile"))
     })
     expect(exist).toBe(false);
   })
})
describe("click and copy test",()=>{
  test('should click and copy', () => {
   
    const div = [{title:"çok gülen adam",symbol:":))"}]
    render(  <EmojiResults emojiData={div} />);
    const contactNames =screen.getByText("çok gülen adam");
    userEvent.click(contactNames);
    const item= navigator.clipboard.readText();
    console.log(item);
  })
  
})


