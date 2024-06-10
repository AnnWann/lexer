const regex_tokens = new Map ([
  [/int|float|double|long|char|short|void|return|if|else|while|for|break|continue/, 'keywords'],
  [/^-?\d+(\.\d+)?([eE][+-]?\d+)?/, 'numeral'],
  [/==|!=|<=|>=|<|>/, 'comparison'],7
  [/!/, 'deny'],
  [/\+/, 'add'],
  [/-/, 'subtract'],
  [/\*/, 'multiply_pointer'],
  [/\//, 'divide'],
  [/&/, 'bitwise_and'],
  [/\|/, 'bitwise_or'],
  [/\^/, 'bitwise_xor'],
  [/~/, 'bitwise_not'],
  [/<<|>>/, 'bitwise_shift'],
  [/=/, 'assign'],
  [/\+=|\-=|\*=|\/=|%=|<<=|>>=|&=|\|=|^=/, 'compound_assign'],
  [/&&/, 'logical_and'],
  [/\|\|/, 'logical_or'],
  [/\./, 'dot'],
  [/\,/, 'comma'],
  [/\:/, 'colon'],
  [/\;/, 'semicolon'],
  [/->/, 'arrow'],
  [/\[/, 'brace_l'],
  [/\]/, 'brace_r'],
  [/\{/, 'bracket_l'],
  [/\}/, 'bracket_r'],
  [/\(/, 'parenthesis_l'],
  [/\)/, 'parenthesis_r'],
  [/\"([^\\\"]|\\["\\bfnrt"\\])*\"/, 'string'],
  [/\'(.)\'/, 'char_literal'],
  [/[a-zA-Z_][a-zA-Z0-9_]*/, 'identifier'],
]);

const regex_stopping_signs = new Map ([
  [/\s/, 'empty space'],
  [/[A-Za-z_0-9_]/, 'letters and numbers'],
  [/\{|\}|\(|\)|\[|\]|;|.|,|:/, 'punctuation'],
  [/"/, 'double quote'],
  [/'/, 'single_quote'],
  [/\/\*/, 'm_comment_s'],
  [/\*/, 'm_comment_e'],
  [/\/\//, 's_comment'],
  [/\n/, 'line_b'],
  [/=|!|<|>|\+|-|\*\/|>|<|\||&/, 'operators'],
]);

module.exports = {
  regex_tokens,
  regex_stopping_signs,
}
