// Generated from ../ExpressionAntlrLexer.g4 by ANTLR 4.6-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { CharStream } from "antlr4ts/CharStream";
import { Lexer } from "antlr4ts/Lexer";
import { LexerATNSimulator } from "antlr4ts/atn/LexerATNSimulator";
import { NotNull } from "antlr4ts/Decorators";
import { Override } from "antlr4ts/Decorators";
import { RuleContext } from "antlr4ts/RuleContext";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";


export class ExpressionAntlrLexer extends Lexer {
	public static readonly STRING_INTERPOLATION_START = 1;
	public static readonly PLUS = 2;
	public static readonly SUBSTRACT = 3;
	public static readonly NON = 4;
	public static readonly XOR = 5;
	public static readonly ASTERISK = 6;
	public static readonly SLASH = 7;
	public static readonly PERCENT = 8;
	public static readonly DOUBLE_EQUAL = 9;
	public static readonly NOT_EQUAL = 10;
	public static readonly SINGLE_AND = 11;
	public static readonly DOUBLE_AND = 12;
	public static readonly DOUBLE_VERTICAL_CYLINDER = 13;
	public static readonly LESS_THAN = 14;
	public static readonly MORE_THAN = 15;
	public static readonly LESS_OR_EQUAl = 16;
	public static readonly MORE_OR_EQUAL = 17;
	public static readonly OPEN_BRACKET = 18;
	public static readonly CLOSE_BRACKET = 19;
	public static readonly DOT = 20;
	public static readonly OPEN_SQUARE_BRACKET = 21;
	public static readonly CLOSE_SQUARE_BRACKET = 22;
	public static readonly COMMA = 23;
	public static readonly NUMBER = 24;
	public static readonly WHITESPACE = 25;
	public static readonly IDENTIFIER = 26;
	public static readonly NEWLINE = 27;
	public static readonly STRING = 28;
	public static readonly CONSTANT = 29;
	public static readonly INVALID_TOKEN_DEFAULT_MODE = 30;
	public static readonly TEMPLATE = 31;
	public static readonly ESCAPE_CHARACTER = 32;
	public static readonly TEXT_CONTENT = 33;
	public static readonly STRING_INTERPOLATION_MODE = 1;
	// tslint:disable:no-trailing-whitespace
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE", "STRING_INTERPOLATION_MODE",
	];

	public static readonly ruleNames: string[] = [
		"LETTER", "DIGIT", "STRING_INTERPOLATION_START", "PLUS", "SUBSTRACT", 
		"NON", "XOR", "ASTERISK", "SLASH", "PERCENT", "DOUBLE_EQUAL", "NOT_EQUAL", 
		"SINGLE_AND", "DOUBLE_AND", "DOUBLE_VERTICAL_CYLINDER", "LESS_THAN", "MORE_THAN", 
		"LESS_OR_EQUAl", "MORE_OR_EQUAL", "OPEN_BRACKET", "CLOSE_BRACKET", "DOT", 
		"OPEN_SQUARE_BRACKET", "CLOSE_SQUARE_BRACKET", "COMMA", "NUMBER", "WHITESPACE", 
		"IDENTIFIER", "NEWLINE", "STRING", "CONSTANT", "INVALID_TOKEN_DEFAULT_MODE", 
		"STRING_INTERPOLATION_END", "TEMPLATE", "ESCAPE_CHARACTER", "TEXT_CONTENT",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, undefined, "'+'", "'-'", "'!'", "'^'", "'*'", "'/'", "'%'", 
		"'=='", undefined, "'&'", "'&&'", "'||'", "'<'", "'>'", "'<='", "'>='", 
		"'('", "')'", "'.'", "'['", "']'", "','",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "STRING_INTERPOLATION_START", "PLUS", "SUBSTRACT", "NON", "XOR", 
		"ASTERISK", "SLASH", "PERCENT", "DOUBLE_EQUAL", "NOT_EQUAL", "SINGLE_AND", 
		"DOUBLE_AND", "DOUBLE_VERTICAL_CYLINDER", "LESS_THAN", "MORE_THAN", "LESS_OR_EQUAl", 
		"MORE_OR_EQUAL", "OPEN_BRACKET", "CLOSE_BRACKET", "DOT", "OPEN_SQUARE_BRACKET", 
		"CLOSE_SQUARE_BRACKET", "COMMA", "NUMBER", "WHITESPACE", "IDENTIFIER", 
		"NEWLINE", "STRING", "CONSTANT", "INVALID_TOKEN_DEFAULT_MODE", "TEMPLATE", 
		"ESCAPE_CHARACTER", "TEXT_CONTENT",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(ExpressionAntlrLexer._LITERAL_NAMES, ExpressionAntlrLexer._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return ExpressionAntlrLexer.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace


	  ignoreWS = true;      // usually we ignore whitespace, but inside stringInterpolation, whitespace is significant


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(ExpressionAntlrLexer._ATN, this);
	}

	// @Override
	public get grammarFileName(): string { return "ExpressionAntlrLexer.g4"; }

	// @Override
	public get ruleNames(): string[] { return ExpressionAntlrLexer.ruleNames; }

	// @Override
	public get serializedATN(): string { return ExpressionAntlrLexer._serializedATN; }

	// @Override
	public get modeNames(): string[] { return ExpressionAntlrLexer.modeNames; }

	// @Override
	public action(_localctx: RuleContext, ruleIndex: number, actionIndex: number): void {
		switch (ruleIndex) {
		case 2:
			this.STRING_INTERPOLATION_START_action(_localctx, actionIndex);
			break;

		case 32:
			this.STRING_INTERPOLATION_END_action(_localctx, actionIndex);
			break;
		}
	}
	private STRING_INTERPOLATION_START_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 0:
			 this.ignoreWS = false;
			break;
		}
	}
	private STRING_INTERPOLATION_END_action(_localctx: RuleContext, actionIndex: number): void {
		switch (actionIndex) {
		case 1:
			this.ignoreWS = true;
			break;
		}
	}
	// @Override
	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 26:
			return this.WHITESPACE_sempred(_localctx, predIndex);
		}
		return true;
	}
	private WHITESPACE_sempred(_localctx: RuleContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.ignoreWS;
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uAF6F\u8320\u479D\uB75C\u4880\u1605\u191C\uAB37\x02#\xEC\b\x01\b" +
		"\x01\x04\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t" +
		"\x06\x04\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04" +
		"\r\t\r\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12" +
		"\t\x12\x04\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17" +
		"\t\x17\x04\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C" +
		"\t\x1C\x04\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"" +
		"\t\"\x04#\t#\x04$\t$\x04%\t%\x03\x02\x03\x02\x03\x03\x03\x03\x03\x04\x03" +
		"\x04\x03\x04\x03\x04\x03\x04\x03\x05\x03\x05\x03\x06\x03\x06\x03\x07\x03" +
		"\x07\x03\b\x03\b\x03\t\x03\t\x03\n\x03\n\x03\v\x03\v\x03\f\x03\f\x03\f" +
		"\x03\r\x03\r\x03\r\x03\r\x05\rk\n\r\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03" +
		"\x0F\x03\x10\x03\x10\x03\x10\x03\x11\x03\x11\x03\x12\x03\x12\x03\x13\x03" +
		"\x13\x03\x13\x03\x14\x03\x14\x03\x14\x03\x15\x03\x15\x03\x16\x03\x16\x03" +
		"\x17\x03\x17\x03\x18\x03\x18\x03\x19\x03\x19\x03\x1A\x03\x1A\x03\x1B\x06" +
		"\x1B\x8C\n\x1B\r\x1B\x0E\x1B\x8D\x03\x1B\x03\x1B\x06\x1B\x92\n\x1B\r\x1B" +
		"\x0E\x1B\x93\x05\x1B\x96\n\x1B\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1C" +
		"\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x05\x1D\xA2\n\x1D\x03\x1D\x03" +
		"\x1D\x03\x1D\x07\x1D\xA7\n\x1D\f\x1D\x0E\x1D\xAA\v\x1D\x03\x1D\x05\x1D" +
		"\xAD\n\x1D\x03\x1E\x05\x1E\xB0\n\x1E\x03\x1E\x03\x1E\x03\x1E\x03\x1E\x03" +
		"\x1F\x03\x1F\x07\x1F\xB8\n\x1F\f\x1F\x0E\x1F\xBB\v\x1F\x03\x1F\x03\x1F" +
		"\x03\x1F\x07\x1F\xC0\n\x1F\f\x1F\x0E\x1F\xC3\v\x1F\x03\x1F\x05\x1F\xC6" +
		"\n\x1F\x03 \x03 \x07 \xCA\n \f \x0E \xCD\v \x03 \x03 \x03!\x03!\x03\"" +
		"\x03\"\x03\"\x03\"\x03\"\x03\"\x03#\x03#\x03#\x03#\x07#\xDD\n#\f#\x0E" +
		"#\xE0\v#\x03#\x03#\x03$\x03$\x05$\xE6\n$\x03%\x03%\x03%\x05%\xEB\n%\x03" +
		"\xDE\x02\x02&\x04\x02\x02\x06\x02\x02\b\x02\x03\n\x02\x04\f\x02\x05\x0E" +
		"\x02\x06\x10\x02\x07\x12\x02\b\x14\x02\t\x16\x02\n\x18\x02\v\x1A\x02\f" +
		"\x1C\x02\r\x1E\x02\x0E \x02\x0F\"\x02\x10$\x02\x11&\x02\x12(\x02\x13*" +
		"\x02\x14,\x02\x15.\x02\x160\x02\x172\x02\x184\x02\x196\x02\x1A8\x02\x1B" +
		":\x02\x1C<\x02\x1D>\x02\x1E@\x02\x1FB\x02 D\x02\x02F\x02!H\x02\"J\x02" +
		"#\x04\x02\x03\v\x04\x02C\\c|\x03\x022;\x06\x02\v\v\"\"\xA2\xA2\uFF01\uFF01" +
		"\x05\x02%%BBaa\x04\x02//aa\x03\x02))\x03\x02$$\b\x02\f\f\x0F\x0F$$))}" +
		"}\x7F\x7F\x04\x02\f\f\x0F\x0F\xFC\x02\b\x03\x02\x02\x02\x02\n\x03\x02" +
		"\x02\x02\x02\f\x03\x02\x02\x02\x02\x0E\x03\x02\x02\x02\x02\x10\x03\x02" +
		"\x02\x02\x02\x12\x03\x02\x02\x02\x02\x14\x03\x02\x02\x02\x02\x16\x03\x02" +
		"\x02\x02\x02\x18\x03\x02\x02\x02\x02\x1A\x03\x02\x02\x02\x02\x1C\x03\x02" +
		"\x02\x02\x02\x1E\x03\x02\x02\x02\x02 \x03\x02\x02\x02\x02\"\x03\x02\x02" +
		"\x02\x02$\x03\x02\x02\x02\x02&\x03\x02\x02\x02\x02(\x03\x02\x02\x02\x02" +
		"*\x03\x02\x02\x02\x02,\x03\x02\x02\x02\x02.\x03\x02\x02\x02\x020\x03\x02" +
		"\x02\x02\x022\x03\x02\x02\x02\x024\x03\x02\x02\x02\x026\x03\x02\x02\x02" +
		"\x028\x03\x02\x02\x02\x02:\x03\x02\x02\x02\x02<\x03\x02\x02\x02\x02>\x03" +
		"\x02\x02\x02\x02@\x03\x02\x02\x02\x02B\x03\x02\x02\x02\x03D\x03\x02\x02" +
		"\x02\x03F\x03\x02\x02\x02\x03H\x03\x02\x02\x02\x03J\x03\x02\x02\x02\x04" +
		"L\x03\x02\x02\x02\x06N\x03\x02\x02\x02\bP\x03\x02\x02\x02\nU\x03\x02\x02" +
		"\x02\fW\x03\x02\x02\x02\x0EY\x03\x02\x02\x02\x10[\x03\x02\x02\x02\x12" +
		"]\x03\x02\x02\x02\x14_\x03\x02\x02\x02\x16a\x03\x02\x02\x02\x18c\x03\x02" +
		"\x02\x02\x1Aj\x03\x02\x02\x02\x1Cl\x03\x02\x02\x02\x1En\x03\x02\x02\x02" +
		" q\x03\x02\x02\x02\"t\x03\x02\x02\x02$v\x03\x02\x02\x02&x\x03\x02\x02" +
		"\x02({\x03\x02\x02\x02*~\x03\x02\x02\x02,\x80\x03\x02\x02\x02.\x82\x03" +
		"\x02\x02\x020\x84\x03\x02\x02\x022\x86\x03\x02\x02\x024\x88\x03\x02\x02" +
		"\x026\x8B\x03\x02\x02\x028\x97\x03\x02\x02\x02:\xA1\x03\x02\x02\x02<\xAF" +
		"\x03\x02\x02\x02>\xC5\x03\x02\x02\x02@\xC7\x03\x02\x02\x02B\xD0\x03\x02" +
		"\x02\x02D\xD2\x03\x02\x02\x02F\xD8\x03\x02\x02\x02H\xE3\x03\x02\x02\x02" +
		"J\xEA\x03\x02\x02\x02LM\t\x02\x02\x02M\x05\x03\x02\x02\x02NO\t\x03\x02" +
		"\x02O\x07\x03\x02\x02\x02PQ\x07b\x02\x02QR\b\x04\x02\x02RS\x03\x02\x02" +
		"\x02ST\b\x04\x03\x02T\t\x03\x02\x02\x02UV\x07-\x02\x02V\v\x03\x02\x02" +
		"\x02WX\x07/\x02\x02X\r\x03\x02\x02\x02YZ\x07#\x02\x02Z\x0F\x03\x02\x02" +
		"\x02[\\\x07`\x02\x02\\\x11\x03\x02\x02\x02]^\x07,\x02\x02^\x13\x03\x02" +
		"\x02\x02_`\x071\x02\x02`\x15\x03\x02\x02\x02ab\x07\'\x02\x02b\x17\x03" +
		"\x02\x02\x02cd\x07?\x02\x02de\x07?\x02\x02e\x19\x03\x02\x02\x02fg\x07" +
		"#\x02\x02gk\x07?\x02\x02hi\x07>\x02\x02ik\x07@\x02\x02jf\x03\x02\x02\x02" +
		"jh\x03\x02\x02\x02k\x1B\x03\x02\x02\x02lm\x07(\x02\x02m\x1D\x03\x02\x02" +
		"\x02no\x07(\x02\x02op\x07(\x02\x02p\x1F\x03\x02\x02\x02qr\x07~\x02\x02" +
		"rs\x07~\x02\x02s!\x03\x02\x02\x02tu\x07>\x02\x02u#\x03\x02\x02\x02vw\x07" +
		"@\x02\x02w%\x03\x02\x02\x02xy\x07>\x02\x02yz\x07?\x02\x02z\'\x03\x02\x02" +
		"\x02{|\x07@\x02\x02|}\x07?\x02\x02})\x03\x02\x02\x02~\x7F\x07*\x02\x02" +
		"\x7F+\x03\x02\x02\x02\x80\x81\x07+\x02\x02\x81-\x03\x02\x02\x02\x82\x83" +
		"\x070\x02\x02\x83/\x03\x02\x02\x02\x84\x85\x07]\x02\x02\x851\x03\x02\x02" +
		"\x02\x86\x87\x07_\x02\x02\x873\x03\x02\x02\x02\x88\x89\x07.\x02\x02\x89" +
		"5\x03\x02\x02\x02\x8A\x8C\x05\x06\x03\x02\x8B\x8A\x03\x02\x02\x02\x8C" +
		"\x8D\x03\x02\x02\x02\x8D\x8B\x03\x02\x02\x02\x8D\x8E\x03\x02\x02\x02\x8E" +
		"\x95\x03\x02\x02\x02\x8F\x91\x070\x02\x02\x90\x92\x05\x06\x03\x02\x91" +
		"\x90\x03\x02\x02\x02\x92\x93\x03\x02\x02\x02\x93\x91\x03\x02\x02\x02\x93" +
		"\x94\x03\x02\x02\x02\x94\x96\x03\x02\x02\x02\x95\x8F\x03\x02\x02\x02\x95" +
		"\x96\x03\x02\x02\x02\x967\x03\x02\x02\x02\x97\x98\t\x04\x02\x02\x98\x99" +
		"\x06\x1C\x02\x02\x99\x9A\x03\x02\x02\x02\x9A\x9B\b\x1C\x04\x02\x9B9\x03" +
		"\x02\x02\x02\x9C\xA2\x05\x04\x02\x02\x9D\xA2\t\x05\x02\x02\x9E\x9F\x07" +
		"B\x02\x02\x9F\xA2\x07B\x02\x02\xA0\xA2\x04&\'\x02\xA1\x9C\x03\x02\x02" +
		"\x02\xA1\x9D\x03\x02\x02\x02\xA1\x9E\x03\x02\x02\x02\xA1\xA0\x03\x02\x02" +
		"\x02\xA2\xA8\x03\x02\x02\x02\xA3\xA7\x05\x04\x02\x02\xA4\xA7\x05\x06\x03" +
		"\x02\xA5\xA7\t\x06\x02\x02\xA6\xA3\x03\x02\x02\x02\xA6\xA4\x03\x02\x02" +
		"\x02\xA6\xA5\x03\x02\x02\x02\xA7\xAA\x03\x02\x02\x02\xA8\xA6\x03\x02\x02" +
		"\x02\xA8\xA9\x03\x02\x02\x02\xA9\xAC\x03\x02\x02\x02\xAA\xA8\x03\x02\x02" +
		"\x02\xAB\xAD\x07#\x02\x02\xAC\xAB\x03\x02\x02\x02\xAC\xAD\x03\x02\x02" +
		"\x02\xAD;\x03\x02\x02\x02\xAE\xB0\x07\x0F\x02\x02\xAF\xAE\x03\x02\x02" +
		"\x02\xAF\xB0\x03\x02\x02\x02\xB0\xB1\x03\x02\x02\x02\xB1\xB2\x07\f\x02" +
		"\x02\xB2\xB3\x03\x02\x02\x02\xB3\xB4\b\x1E\x04\x02\xB4=\x03\x02\x02\x02" +
		"\xB5\xB9\x07)\x02\x02\xB6\xB8\n\x07\x02\x02\xB7\xB6\x03\x02\x02\x02\xB8" +
		"\xBB\x03\x02\x02\x02\xB9\xB7\x03\x02\x02\x02\xB9\xBA\x03\x02\x02\x02\xBA" +
		"\xBC\x03\x02\x02\x02\xBB\xB9\x03\x02\x02\x02\xBC\xC6\x07)\x02\x02\xBD" +
		"\xC1\x07$\x02\x02\xBE\xC0\n\b\x02\x02\xBF\xBE\x03\x02\x02\x02\xC0\xC3" +
		"\x03\x02\x02\x02\xC1\xBF\x03\x02\x02\x02\xC1\xC2\x03\x02\x02\x02\xC2\xC4" +
		"\x03\x02\x02\x02\xC3\xC1\x03\x02\x02\x02\xC4\xC6\x07$\x02\x02\xC5\xB5" +
		"\x03\x02\x02\x02\xC5\xBD\x03\x02\x02\x02\xC6?\x03\x02\x02\x02\xC7\xCB" +
		"\x07}\x02\x02\xC8\xCA\x058\x1C\x02\xC9\xC8\x03\x02\x02\x02\xCA\xCD\x03" +
		"\x02\x02\x02\xCB\xC9\x03\x02\x02\x02\xCB\xCC\x03\x02\x02\x02\xCC\xCE\x03" +
		"\x02\x02\x02\xCD\xCB\x03\x02\x02\x02\xCE\xCF\x07\x7F\x02\x02\xCFA\x03" +
		"\x02\x02\x02\xD0\xD1\v\x02\x02\x02\xD1C\x03\x02\x02\x02\xD2\xD3\x07b\x02" +
		"\x02\xD3\xD4\b\"\x05\x02\xD4\xD5\x03\x02\x02\x02\xD5\xD6\b\"\x06\x02\xD6" +
		"\xD7\b\"\x07\x02\xD7E\x03\x02\x02\x02\xD8\xD9\x07&\x02\x02\xD9\xDE\x07" +
		"}\x02\x02\xDA\xDD\x05>\x1F\x02\xDB\xDD\n\t\x02\x02\xDC\xDA\x03\x02\x02" +
		"\x02\xDC\xDB\x03\x02\x02\x02\xDD\xE0\x03\x02\x02\x02\xDE\xDF\x03\x02\x02" +
		"\x02\xDE\xDC\x03\x02\x02\x02\xDF\xE1\x03\x02\x02\x02\xE0\xDE\x03\x02\x02" +
		"\x02\xE1\xE2\x07\x7F\x02\x02\xE2G\x03\x02\x02\x02\xE3\xE5\x07^\x02\x02" +
		"\xE4\xE6\n\n\x02\x02\xE5\xE4\x03\x02\x02\x02\xE5\xE6\x03\x02\x02\x02\xE6" +
		"I\x03\x02\x02\x02\xE7\xE8\x07^\x02\x02\xE8\xEB\x07b\x02\x02\xE9\xEB\n" +
		"\n\x02\x02\xEA\xE7\x03\x02\x02\x02\xEA\xE9\x03\x02\x02\x02\xEBK\x03\x02" +
		"\x02\x02\x15\x02\x03j\x8D\x93\x95\xA1\xA6\xA8\xAC\xAF\xB9\xC1\xC5\xCB" +
		"\xDC\xDE\xE5\xEA\b\x03\x04\x02\x07\x03\x02\b\x02\x02\x03\"\x03\t\x03\x02" +
		"\x06\x02\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!ExpressionAntlrLexer.__ATN) {
			ExpressionAntlrLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(ExpressionAntlrLexer._serializedATN));
		}

		return ExpressionAntlrLexer.__ATN;
	}

}

