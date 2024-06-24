import { regex_tokens } from './regexCodes';
import { createSHA256Hash } from './hash';

type token = {
  value: string,
  type: string
};

type lexicalAnalysis = {
  tokenList: token[],
  idTable: Map<string, string>
  file: string, 
  running: 'regular' | 'string' | 's_comment' | 'm_comment' | 'char',
  status: 'done' | 'undone' | 'doing',
  err: string[]
}

function Tokenize(file: string): lexicalAnalysis{

  const L_analysis: lexicalAnalysis = { tokenList: new Array<token>(), idTable: new Map<string, string>(), file: file, running: 'regular', status: 'undone', err: new Array<string>()};
  
  return findLexeme(file, 0, '', 1);

  function findLexeme(file: string, i: number, lexeme: string, line: number){
    
    if(i == file.length){
      if(L_analysis.running == 'string' || L_analysis.running == 'char') L_analysis.err.push(`at line ${line}, unclosed quotation`);
      return L_analysis;
    }

    const curr_char = file[i];

    if(/[A-Za-z0-9]/.test(curr_char))
      return findLexeme(file, i + 1, lexeme + curr_char, line);

    if(curr_char == '\n') line += 1;

    switch(L_analysis.running){
      
      case 'string': 
        if(curr_char == `"`) {
          L_analysis.tokenList.push(getToken(lexeme + curr_char));
          lexeme = '';
          L_analysis.running = 'regular';
          return findLexeme(file, i + 1, lexeme, line);
        }
      
      case 'char':
        if(curr_char == `'`) {
          lexeme += curr_char;
          L_analysis.tokenList.push(getToken(lexeme));
          if(lexeme.length > 3) L_analysis.err.push(`at line ${line}, improper usage of single quotes ('), char literals shouldn't be longer than 1 character.`);
          lexeme = '';
          L_analysis.running = 'regular';
          return findLexeme(file, i + 1, lexeme, line);
        }

      case 's_comment': 
        if(curr_char == '\n')
          return findLexeme(file, i + 1, '', line);
      
      case 'm_comment': 
        if(curr_char == '*'){
          const curr_and_next = curr_char + file[i];
          if(curr_and_next == "*/")
            return findLexeme(file, i + 1, '', line);
        }
      
      default: 
        L_analysis.tokenList.push(getToken(lexeme));
        return findLexeme(file, i, '', line);
    }

    function getToken(lex: string): token{
      for(const [rule, name] of regex_tokens.entries()){
        if(rule.test(lex)){
          return name == 'identifier' ? setId(lex) : { value: lex, type: name }; 
        }
    }
      return { value: lex, type: 'ERROR' };
  
      function setId(lex){
        const lex_hash = createSHA256Hash(lex);
        if(!L_analysis.idTable.get(lex_hash)) L_analysis.idTable.set(lex_hash, lex);
        return { value: lex_hash, type: 'identifier' }; 
      }
    }
  }

}

const x = Tokenize('hello world !!1');