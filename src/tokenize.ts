import { createSHA256Hash } from "./hash";
import { setNextStep } from "./lexical_analysis";
import { regex_tokens } from "./regexCodes";
import { token, run_state } from "./types";

export {
  tokenize,
}

function tokenize(run_state: run_state): run_state {
  
  const lexeme = run_state.current_state.lexeme;

  for(const [rule, name] of regex_tokens.entries()){
    if(rule.test(lexeme)){
      const token: token = name == 'identifier' ? setId() : { value: lexeme, type: name };
      run_state.overall_state.tokenList.push(token);
      run_state.current_state = undefined;
      return setNextStep(run_state, undefined);
    } 
  }

  run_state.overall_state.err.push(`at ${run_state.current_state.line}, ${run_state.current_state.column}: Couldn't find a definition for ${lexeme}`);
  const token = { value: lexeme, type: 'ERROR' };
  run_state.overall_state.tokenList.push(token);
  run_state.current_state = undefined;
  return setNextStep(run_state, undefined);

  function setId(): token{
    const lex_hash = createSHA256Hash(lexeme);
    if(!run_state.overall_state.idTable.get(lex_hash)) run_state.overall_state.idTable.set(lex_hash, lexeme);
    return { value: lex_hash, type: 'identifier' }; 
  }
}
