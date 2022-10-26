/**
 *
 * Wraps a string value in an object
 * @constructor
 */
function MoreString(str) {
	this.str = str || '';
}

/**
 * Make a new string from substring elements and optional delimiter
 * @param {Array} arr Array of string values
 * @param {string} delim desired delimiter between each array element, default
 *     to empty string, i.e. no delimiter
 * @returns a new MoreString
 */
MoreString.fromCharSeq = function(arr, delim) {
  return new this( (arr || []).join(delim || '') );
};

/**
 * Validates that MoreString wraps a string as intended.
 * @returns whether MoreString object contains a true string
 */
MoreString.prototype.isValidStr = function() {
	return typeof(this.str) === 'string';
};

/**
 *
 * @param {string} subStr sequence of characters to find in the MoreString
 *     string value
 * @returns match result from using the given substring as the regular
 *     expression
 */
MoreString.prototype.findSubStr = function(subStr) {
  return this.str.match( new RegExp(subStr) )?.[0];
};

/**
 * @param {string} subStr sequence of characters to find in the MoreString
 *     string value
 * @returns match result from using the given substring as the regular
 *     expression with the global flag, or the empty string if the substring
 *     does not occur in the MoreString string value.
 */
MoreString.prototype.findSubStrAll = function(subStr) {
  return this.str.match( new RegExp(subStr, 'g') ) ?? '';
};

/**
 * @param {string} subStr sequence of characters to find in the MoreString
 *     string value
 * @returns count of occurrences of a substring in a MoreString string value.
 */
MoreString.prototype.subStrCount = function(subStr) {
  return this.findSubStrAll(subStr).length;
};

/**
 * To test any string for beginning with an alphabetic character when keeping
 *     the object is not desired, (new MoreString(givenString)).isLtr
 * @returns boolean
 */
MoreString.prototype.isLtr = function() {
  return this.str.match(/^[a-zA-Z]/) != null;
};

/**
 * To test any string for beginning with a capital alphabetic character when
 *     keeping the object is not desired, (new MoreString(givenString)).isCap
 * @returns boolean
 */
MoreString.prototype.isCap = function() {
  return this.str.match(/^[A-Z]/) != null;
};

/**
 *
 * @param {string} delim Default space, or specify a separator character
 *     occurring between word items of the MoreString string value.
 * @returns a string in which there are no more than 79 printed characters
 *     per line
 */
MoreString.prototype.under80CharsPerLine = function(delim) {
  const tokens = this.str.split(delim || ' ');
  const lines = [];
  let nextCount;
  let lineCharCount = 0;
  let lineStartIndex = 0;

  for (let i = 0; i < tokens.length; i++) {
    nextCount = lineCharCount + tokens[i].length;

    if (nextCount < 80) {
      lineCharCount = nextCount;
    } else {
      lines.push(tokens.slice(lineStartIndex, i));
      /* current token didn't fit so finalized current line
      */
      if (i === tokens.length - 1) { /* final token */
        lines.push(tokens[i]);
        /* finalized the next and final line
        */
      } else { /* initialize next line */
        lineStartIndex = i;
        lineCharCount = tokens[i].length;
      }
      continue;
    }

    /* Current token fits on line.
      If there's a next token, will it also fit? */
    if (i + 1 < tokens.length) {
      nextCount = lineCharCount + delim.length + tokens[i + 1].length;
      if (nextCount > 79) { /* next token doesn't fit */
        lines.push(tokens.slice(lineStartIndex, i + 1));
        lineStartIndex = i + 1;
        lineCharCount = 0;
      } else { /* next token fits */
        lineCharCount++; /* count the join space */
      }
    } else { /* There's no next token so add the final line. */
      lines.push(tokens.slice(lineStartIndex));
    }
  }

  for (let i = 0; i < lines.length; i++) {
    lines[i] = lines[i].join(' ') + '\n';
  }

  return lines.join('');
}

/**
 * Attaches given string to the MoreString string value by comma delimiter
 * @param {string} s the string item to join by comma
 * @returns string with at least one occurrence of a comma separator
 */
MoreString.prototype.csvIncrement = function(s) {
  return (this.str.length && this.str.split(',') || []).concat([ s ]).join();
};

/**
 *
 * @param {number} totalSeconds a duration of time in seconds
 * @returns a MoreString whose string value represents a conversion of a
 *     duration in seconds into an equivalent expression in hours, minutes,
 *     and seconds, colon-delimited, leading zeroes for minutes and seconds
 *     if necessary.
 */
MoreString.toHmmss = function(totalSeconds) {
  return new this(
    totalSeconds === Infinity && '\u221E' || [
      Math.floor(totalSeconds / 60 / 60),
      Math.floor(totalSeconds / 60) % 60,
      totalSeconds % 60
    ].map( (x, i) => `${x}`.padStart( (i ? 2 : 1), 0 ) ).join(':')
  );
};

/**
 *
 * @param {number} totalSeconds a duration of time in seconds
 * @returns a MoreString whose string value represents a conversion of a
 *     duration in seconds into an equivalent expression in hours, minutes,
 *     and seconds, each unit suffixed "h", "m", and "s", resp.,
 *     space-delimited, no leading zeroes--a common format for machine-readable
 *     time duration text node children of  the semantic html tag <time>.
 */
MoreString.toReadableHMS = function(totalSeconds) {
  return new this(
    [
      Math.floor(totalSeconds / 60 / 60),
      Math.floor(totalSeconds / 60) % 60,
      totalSeconds % 60
    ].map( (x, i) => x + 'hms'[i] ).join(' ')
  );
};

/**
 *
 * @param {number} totalSeconds a duration of time in seconds
 * @returns a MoreString whose string value represents a conversion of a
 *     duration in seconds into an equivalent expression in hours, minutes,
 *     and seconds, formatted according to the HTML standard for a valid time
 *     duration string assigned to the "datetime" attribute of the semantic
 *     <time> tag
 */
MoreString.toDuration = function(totalSeconds) {
  return new this(
    "PT" + [
      Math.floor(totalSeconds / 60 / 60),
      Math.floor(totalSeconds / 60) % 60,
      totalSeconds % 60
    ].map( (x, i) => x + 'HMS'[i] ).join('')
  );
};

export default MoreString
