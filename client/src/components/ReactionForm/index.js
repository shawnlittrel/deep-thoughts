import React, { useState } from "react";
import { ADD_REACTION } from '../../utils/mutations';
import { useMutation } from "@apollo/client";

const ReactionForm = ({ thoughtId }) => {
     //monitor character count
     const [characterCount, setCharacterCount] = useState(0);

     //monitor text in form
     const [reactionBody, setBody] = useState('');

     //mutation variables
     const [addReaction, { error }] = useMutation(ADD_REACTION);

     //update character count and body text on each change
     const handleChange = event => {
          if (event.target.value.length <= 200) {
               setBody(event.target.value);
               setCharacterCount(event.target.value.length);
          }
     };

     //reset values to default when form is submitted
     const handleFormSubmit = async event => {
          event.preventDefault();
          await addReaction({
               variables: { reactionBody, thoughtId }
          })
          setBody('');
          setCharacterCount(0);
          
     };


  return (
    <div>
      <p className={`m-0 ${characterCount === 280 || error ? "text-error" : ""}`}>
           Character Count: {characterCount}/280
           {error && <span className="ml-2">Something went wrong.</span>}
     </p>
      <form className="flex-row justify-center justify-space-between-md align-stretch">
        <textarea
          placeholder="Leave a reaction to this thought"
          className="form-input col-12 col-md-9"
          onChange={handleChange}
          value={reactionBody}
        ></textarea>

        <button 
        className="btn col-12 col-md-3" 
        type="submit"
        onClick={handleFormSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReactionForm;
