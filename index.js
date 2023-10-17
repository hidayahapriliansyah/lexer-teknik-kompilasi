// Token types
const TokenType = {
    INTEGER: 'INTEGER',
    PLUS: 'PLUS',
    MINUS: 'MINUS',
    MULTIPLY: 'MULTIPLY',
    DIVIDE: 'DIVIDE',
    LPAREN: 'LPAREN',
    RPAREN: 'RPAREN',
    EOF: 'EOF',
};

// Token class
class Token {
    constructor(type, lexeme) {
        this.type = type;
        this.lexeme = lexeme;
    }
}

// Input string
let input = '';
// Current position in the input
let position = 0;

// Function to advance to the next character in the input
function advance() {
    position++;
}

// Function to get the current character
function peek() {
    return input[position];
}

// Function to skip whitespace
function skipWhitespace() {
    while (position < input.length && /\s/.test(peek())) {
        advance();
    }
}

// Function to get the next token
function getNextToken() {
    skipWhitespace();

    if (position >= input.length) {
        return new Token(TokenType.EOF, '');
    }

    let currentChar = peek();

    if (/\d/.test(currentChar)) {
        let lexeme = '';
        while (position < input.length && /\d/.test(currentChar)) {
            lexeme += currentChar;
            advance();
            currentChar = peek();
        }
        return new Token(TokenType.INTEGER, lexeme);
    } else if (currentChar === '+') {
        advance();
        return new Token(TokenType.PLUS, '+');
    } else if (currentChar === '-') {
        advance();
        return new Token(TokenType.MINUS, '-');
    } else if (currentChar === '*') {
        advance();
        return new Token(TokenType.MULTIPLY, '*');
    } else if (currentChar === '/') {
        advance();
        return new Token(TokenType.DIVIDE, '/');
    } else if (currentChar === '(') {
        advance();
        return new Token(TokenType.LPAREN, '(');
    } else if (currentChar === ')') {
        advance();
        return new Token(TokenType.RPAREN, ')');
    } else {
        throw new Error(`Invalid character: ${currentChar}`);
    }
}

// Example usage
input = '7 + 3 * (10 / (12 / (3 + 1) - 1))';
let token = getNextToken();
while (token.type !== TokenType.EOF) {
    console.log(`Token Type: ${token.type}, Lexeme: ${token.lexeme}`);
    token = getNextToken();
}