
let map = new Map([
  ["(==)",`
<code class="code">e1 = e2</code> tests for structural equality of <code class="code">e1</code> and <code class="code">e2</code>.
   Mutable structures (e.g. references and arrays) are equal
   if and only if their current contents are structurally equal,
   even if the two mutable objects are not the same physical object.
   Equality between functional values raises <code class="code">Invalid_argument</code>.
   Equality between cyclic data structures may not terminate.<br>
`],["(!=)",`
Negation of <a href="https://reasonml.github.io/api/Pervasives.html#VAL(=)" target="_blank"><code class="code">Pervasives.(=)</code></a>.<br>
`],["(<)",`
See <a href="https://reasonml.github.io/api/Pervasives.html#VAL(>=)" target="_blank"><code class="code">Pervasives.(&gt;=)</code></a>.<br>
`],["(>)",`
See <a href="https://reasonml.github.io/api/Pervasives.html#VAL(>=)" target="_blank"><code class="code">Pervasives.(&gt;=)</code></a>.<br>
`],["(<=)",`
See <a href="https://reasonml.github.io/api/Pervasives.html#VAL(>=)" target="_blank"><code class="code">Pervasives.(&gt;=)</code></a>.<br>
`],["(>=)",`
Structural ordering functions. These functions coincide with
   the usual orderings over integers, characters, strings, byte sequences
   and floating-point numbers, and extend them to a
   total ordering over all types.
   The ordering is compatible with <code class="code">( = )</code>. As in the case
   of <code class="code">( = )</code>, mutable structures are compared by contents.
   Comparison between functional values raises <code class="code">Invalid_argument</code>.
   Comparison between cyclic structures may not terminate.<br>
`],["compare",`
<code class="code">compare x y</code> returns <code class="code">0</code> if <code class="code">x</code> is equal to <code class="code">y</code>,
   a negative integer if <code class="code">x</code> is less than <code class="code">y</code>, and a positive integer
   if <code class="code">x</code> is greater than <code class="code">y</code>.  The ordering implemented by <code class="code">compare</code>
   is compatible with the comparison predicates <code class="code">=</code>, <code class="code">&lt;</code> and <code class="code">&gt;</code>
   defined above,  with one difference on the treatment of the float value
   <a href="https://reasonml.github.io/api/Pervasives.html#VALnan" target="_blank"><code class="code">Pervasives.nan</code></a>.  Namely, the comparison predicates treat <code class="code">nan</code>
   as different from any other float value, including itself;
   while <code class="code">compare</code> treats <code class="code">nan</code> as equal to itself and less than any
   other float value.  This treatment of <code class="code">nan</code> ensures that <code class="code">compare</code>
   defines a total ordering relation.
<p>

   <code class="code">compare</code> applied to functional values may raise <code class="code">Invalid_argument</code>.
   <code class="code">compare</code> applied to cyclic structures may not terminate.
</p><p>

   The <code class="code">compare</code> function can be used as the comparison function
   required by the <a href="https://reasonml.github.io/api/Set.Make.html" target="_blank"><code class="code">Set.Make</code></a> and <a href="https://reasonml.github.io/api/Map.Make.html" target="_blank"><code class="code">Map.Make</code></a> functors, as well as
   the <a href="https://reasonml.github.io/api/List.html#VALsort" target="_blank"><code class="code">List.sort</code></a> and <a href="https://reasonml.github.io/api/Array.html#VALsort" target="_blank"><code class="code">Array.sort</code></a> functions.<br>
</p>`],["min",`
Return the smaller of the two arguments.
    The result is unspecified if one of the arguments contains
    the float value <code class="code">nan</code>.<br>
`],["max",`
Return the greater of the two arguments.
    The result is unspecified if one of the arguments contains
    the float value <code class="code">nan</code>.<br>
`],["(===)",`
<code class="code">e1 == e2</code> tests for physical equality of <code class="code">e1</code> and <code class="code">e2</code>.
   On mutable types such as references, arrays, byte sequences, records with
   mutable fields and objects with mutable instance variables,
   <code class="code">e1 == e2</code> is true if and only if physical modification of <code class="code">e1</code>
   also affects <code class="code">e2</code>.
   On non-mutable types, the behavior of <code class="code">( == )</code> is
   implementation-dependent; however, it is guaranteed that
   <code class="code">e1 == e2</code> implies <code class="code">compare e1 e2 = 0</code>.<br>
`],["(!==)",`
Negation of <a href="https://reasonml.github.io/api/Pervasives.html#VAL(==)" target="_blank"><code class="code">Pervasives.(==)</code></a>.<br>
`],["(!)",`
<code class="code">!r</code> returns the current contents of reference <code class="code">r</code>.
   Equivalent to <code class="code">fun r -&gt; r.contents</code>.<br>
`],["(&&)",`
The boolean 'and'. Evaluation is sequential, left-to-right:
   in <code class="code">e1 &amp;&amp; e2</code>, <code class="code">e1</code> is evaluated first, and if it returns <code class="code">false</code>,
   <code class="code">e2</code> is not evaluated at all.<br>
`],["(||)",`
The boolean 'or'. Evaluation is sequential, left-to-right:
   in <code class="code">e1 || e2</code>, <code class="code">e1</code> is evaluated first, and if it returns <code class="code">true</code>,
   <code class="code">e2</code> is not evaluated at all.<br>
`],["(|>)",`
Reverse-application operator: <code class="code">x |&gt; f |&gt; g</code> is exactly equivalent
 to <code class="code">g (f (x))</code>.<br>
<b>Since</b> 4.01<br>
`],["(@@)",`
Application operator: <code class="code">g @@ f @@ x</code> is exactly equivalent to
 <code class="code">g (f (x))</code>.<br>
<b>Since</b> 4.01<br>
`],["(~-)",`
Unary negation. You can also write <code class="code">- e</code> instead of <code class="code">~- e</code>.<br>
`],["(~+)",`
Unary addition. You can also write <code class="code">+ e</code> instead of <code class="code">~+ e</code>.<br>
<b>Since</b> 3.12.0<br>
`],["succ",`
<code class="code">succ x</code> is <code class="code">x + 1</code>.<br>
`],["pred",`
<code class="code">pred x</code> is <code class="code">x - 1</code>.<br>
`],["(+)",`
Integer addition.<br>
`],["(-)",`
Integer subtraction.<br>
`],["(*)",`
Integer multiplication.<br>
`],["(/)",`
Integer division.
   Raise <code class="code">Division_by_zero</code> if the second argument is 0.
   Integer division rounds the real quotient of its arguments towards zero.
   More precisely, if <code class="code">x &gt;= 0</code> and <code class="code">y &gt; 0</code>, <code class="code">x / y</code> is the greatest integer
   less than or equal to the real quotient of <code class="code">x</code> by <code class="code">y</code>.  Moreover,
   <code class="code">(- x) / y = x / (- y) = - (x / y)</code>.<br>
`],["(mod)",`
Integer remainder.  If <code class="code">y</code> is not zero, the result
   of <code class="code">x mod y</code> satisfies the following properties:
   <code class="code">x = (x / y) * y + x mod y</code> and
   <code class="code">abs(x mod y) &lt;= abs(y) - 1</code>.
   If <code class="code">y = 0</code>, <code class="code">x mod y</code> raises <code class="code">Division_by_zero</code>.
   Note that <code class="code">x mod y</code> is negative only if <code class="code">x &lt; 0</code>.
   Raise <code class="code">Division_by_zero</code> if <code class="code">y</code> is zero.<br>
`],["abs",`
Return the absolute value of the argument.  Note that this may be
  negative if the argument is <code class="code">min_int</code>.<br>
`],["lnot",`
Bitwise logical negation.<br>
`],["(land)",`
Bitwise logical and.<br>
`],["(lor)",`
Bitwise logical or.<br>
`],["(lxor)",`
Bitwise logical exclusive or.<br>
`],["(lsl)",`
<code class="code">n lsl m</code> shifts <code class="code">n</code> to the left by <code class="code">m</code> bits.
   The result is unspecified if <code class="code">m &lt; 0</code> or <code class="code">m &gt;= bitsize</code>,
   where <code class="code">bitsize</code> is <code class="code">32</code> on a 32-bit platform and
   <code class="code">64</code> on a 64-bit platform.<br>
`],["(lsr)",`
<code class="code">n lsr m</code> shifts <code class="code">n</code> to the right by <code class="code">m</code> bits.
   This is a logical shift: zeroes are inserted regardless of
   the sign of <code class="code">n</code>.
   The result is unspecified if <code class="code">m &lt; 0</code> or <code class="code">m &gt;= bitsize</code>.<br>
`],["(asr)",`
<code class="code">n asr m</code> shifts <code class="code">n</code> to the right by <code class="code">m</code> bits.
   This is an arithmetic shift: the sign bit of <code class="code">n</code> is replicated.
   The result is unspecified if <code class="code">m &lt; 0</code> or <code class="code">m &gt;= bitsize</code>.<br>
`],["(~-.)",`
Unary negation. You can also write <code class="code">-. e</code> instead of <code class="code">~-. e</code>.<br>
`],["(~+.)",`
Unary addition. You can also write <code class="code">+. e</code> instead of <code class="code">~+. e</code>.<br>
<b>Since</b> 3.12.0<br>
`],["(+.)",`
Floating-point addition<br>
`],["(-.)",`
Floating-point subtraction<br>
`],["(*.)",`
Floating-point multiplication<br>
`],["(/.)",`
Floating-point division.<br>
`],["(**)",`
Exponentiation.<br>
`],["sqrt",`
Square root.<br>
`],["exp",`
Exponential.<br>
`],["log",`
Natural logarithm.<br>
`],["log10",`
Base 10 logarithm.<br>
`],["expm1",`
<code class="code">expm1 x</code> computes <code class="code">exp x -. 1.0</code>, giving numerically-accurate results
    even if <code class="code">x</code> is close to <code class="code">0.0</code>.<br>
<b>Since</b> 3.12.0<br>
`],["log1p",`
<code class="code">log1p x</code> computes <code class="code">log(1.0 +. x)</code> (natural logarithm),
    giving numerically-accurate results even if <code class="code">x</code> is close to <code class="code">0.0</code>.<br>
<b>Since</b> 3.12.0<br>
`],["cos",`
Cosine.  Argument is in radians.<br>
`],["sin",`
Sine.  Argument is in radians.<br>
`],["tan",`
Tangent.  Argument is in radians.<br>
`],["acos",`
Arc cosine.  The argument must fall within the range <code class="code">[-1.0, 1.0]</code>.
    Result is in radians and is between <code class="code">0.0</code> and <code class="code">pi</code>.<br>
`],["asin",`
Arc sine.  The argument must fall within the range <code class="code">[-1.0, 1.0]</code>.
    Result is in radians and is between <code class="code">-pi/2</code> and <code class="code">pi/2</code>.<br>
`],["atan",`
Arc tangent.
    Result is in radians and is between <code class="code">-pi/2</code> and <code class="code">pi/2</code>.<br>
`],["atan2",`
<code class="code">atan2 y x</code> returns the arc tangent of <code class="code">y /. x</code>.  The signs of <code class="code">x</code>
    and <code class="code">y</code> are used to determine the quadrant of the result.
    Result is in radians and is between <code class="code">-pi</code> and <code class="code">pi</code>.<br>
`],["hypot",`
<code class="code">hypot x y</code> returns <code class="code">sqrt(x *. x + y *. y)</code>, that is, the length
  of the hypotenuse of a right-angled triangle with sides of length
  <code class="code">x</code> and <code class="code">y</code>, or, equivalently, the distance of the point <code class="code">(x,y)</code>
  to origin.<br>
<b>Since</b> 4.00.0<br>
`],["cosh",`
Hyperbolic cosine.  Argument is in radians.<br>
`],["sinh",`
Hyperbolic sine.  Argument is in radians.<br>
`],["tanh",`
Hyperbolic tangent.  Argument is in radians.<br>
`],["ceil",`
Round above to an integer value.
    <code class="code">ceil f</code> returns the least integer value greater than or equal to <code class="code">f</code>.
    The result is returned as a float.<br>
`],["floor",`
Round below to an integer value.
    <code class="code">floor f</code> returns the greatest integer value less than or
    equal to <code class="code">f</code>.
    The result is returned as a float.<br>
`],["abs_float",`
<code class="code">abs_float f</code> returns the absolute value of <code class="code">f</code>.<br>
`],["copysign",`
<code class="code">copysign x y</code> returns a float whose absolute value is that of <code class="code">x</code>
  and whose sign is that of <code class="code">y</code>.  If <code class="code">x</code> is <code class="code">nan</code>, returns <code class="code">nan</code>.
  If <code class="code">y</code> is <code class="code">nan</code>, returns either <code class="code">x</code> or <code class="code">-. x</code>, but it is not
  specified which.<br>
<b>Since</b> 4.00.0<br>
`],["mod_float",`
<code class="code">mod_float a b</code> returns the remainder of <code class="code">a</code> with respect to
   <code class="code">b</code>.  The returned value is <code class="code">a -. n *. b</code>, where <code class="code">n</code>
   is the quotient <code class="code">a /. b</code> rounded towards zero to an integer.<br>
`],["frexp",`
<code class="code">frexp f</code> returns the pair of the significant
   and the exponent of <code class="code">f</code>.  When <code class="code">f</code> is zero, the
   significant <code class="code">x</code> and the exponent <code class="code">n</code> of <code class="code">f</code> are equal to
   zero.  When <code class="code">f</code> is non-zero, they are defined by
   <code class="code">f = x *. 2 ** n</code> and <code class="code">0.5 &lt;= x &lt; 1.0</code>.<br>
`],["ldexp",`
<code class="code">ldexp x n</code> returns <code class="code">x *. 2 ** n</code>.<br>
`],["modf",`
<code class="code">modf f</code> returns the pair of the fractional and integral
   part of <code class="code">f</code>.<br>
`],["float",`
Same as <a href="https://reasonml.github.io/api/Pervasives.html#VALfloat_of_int" target="_blank"><code class="code">Pervasives.float_of_int</code></a>.<br>
`],["float_of_int",`
Convert an integer to floating-point.<br>
`],["truncate",`
Same as <a href="https://reasonml.github.io/api/Pervasives.html#VALint_of_float" target="_blank"><code class="code">Pervasives.int_of_float</code></a>.<br>
`],["int_of_float",`
Truncate the given floating-point number to an integer.
   The result is unspecified if the argument is <code class="code">nan</code> or falls outside the
   range of representable integers.<br>
`],["(++)",`
String concatenation.<br>
`],["int_of_char",`
Return the ASCII code of the argument.<br>
`],["char_of_int",`
Return the character with the given ASCII code.
   Raise <code class="code">Invalid_argument "char_of_int"</code> if the argument is
   outside the range 0--255.<br>
`],["string_of_bool",`
Return the string representation of a boolean. As the returned values
   may be shared, the user should not modify them directly.<br>
`],["bool_of_string",`
Convert the given string to a boolean.
   Raise <code class="code">Invalid_argument "bool_of_string"</code> if the string is not
   <code class="code">"true"</code> or <code class="code">"false"</code>.<br>
`],["string_of_int",`
Return the string representation of an integer, in decimal.<br>
`],["int_of_string",`
Convert the given string to an integer.
   The string is read in decimal (by default) or in hexadecimal (if it
   begins with <code class="code">0x</code> or <code class="code">0X</code>), octal (if it begins with <code class="code">0o</code> or <code class="code">0O</code>),
   or binary (if it begins with <code class="code">0b</code> or <code class="code">0B</code>).
   Raise <code class="code">Failure "int_of_string"</code> if the given string is not
   a valid representation of an integer, or if the integer represented
   exceeds the range of integers representable in type <code class="code">int</code>.<br>
`],["string_of_float",`
Return the string representation of a floating-point number.<br>
`],["float_of_string",`
Convert the given string to a float.  Raise <code class="code">Failure "float_of_string"</code>
   if the given string is not a valid representation of a float.<br>
`],["fst",`
Return the first component of a pair.<br>
`],["snd",`
Return the second component of a pair.<br>
`],["(@)",`
List concatenation.<br>
`],["Char.code",`
Return the ASCII code of the argument.<br>
`],["Char.chr",`
Return the character with the given ASCII code.
   Raise <code class="code">Invalid_argument "Char.chr"</code> if the argument is
   outside the range 0--255.<br>
`],["Char.escaped",`
Return a string representing the given character,
   with special characters escaped following the lexical conventions
   of OCaml.<br>
`],["Char.lowercase",`
Convert the given character to its equivalent lowercase character.<br>
`],["Char.uppercase",`
Convert the given character to its equivalent uppercase character.<br>
`],["String.get",`
<code class="code">String.get s n</code> returns the character at index <code class="code">n</code> in string <code class="code">s</code>.
   You can also write <code class="code">s.[n]</code> instead of <code class="code">String.get s n</code>.
<p>

   Raise <code class="code">Invalid_argument</code> if <code class="code">n</code> not a valid index in <code class="code">s</code>.<br>
</p>`],["String.make",`
<code class="code">String.make n c</code> returns a fresh string of length <code class="code">n</code>,
   filled with the character <code class="code">c</code>.
<p>

   Raise <code class="code">Invalid_argument</code> if <code class="code">n &lt; 0</code> or <code class="code">n &gt; </code><a href="https://reasonml.github.io/api/Sys.html#VALmax_string_length" target="_blank"><code class="code">Sys.max_string_length</code></a>.<br>
</p>`],["String.init",`
<code class="code">String.init n f</code> returns a string of length <code class="code">n</code>, with character
    <code class="code">i</code> initialized to the result of <code class="code">f i</code> (called in increasing
    index order).
<p>

    Raise <code class="code">Invalid_argument</code> if <code class="code">n &lt; 0</code> or <code class="code">n &gt; </code><a href="https://reasonml.github.io/api/Sys.html#VALmax_string_length" target="_blank"><code class="code">Sys.max_string_length</code></a>.<br>
<b>Since</b> 4.02.0<br>
</p>`],["String.sub",`
<code class="code">String.sub s start len</code> returns a fresh string of length <code class="code">len</code>,
   containing the substring of <code class="code">s</code> that starts at position <code class="code">start</code> and
   has length <code class="code">len</code>.
<p>

   Raise <code class="code">Invalid_argument</code> if <code class="code">start</code> and <code class="code">len</code> do not
   designate a valid substring of <code class="code">s</code>.<br>
</p>`],["String.mapi",`
<code class="code">String.mapi f s</code> calls <code class="code">f</code> with each character of <code class="code">s</code> and its
    index (in increasing index order) and stores the results in a new
    string that is returned.<br>
<b>Since</b> 4.02.0<br>
`],["String.map",`
<code class="code">String.map f s</code> applies function <code class="code">f</code> in turn to all the
    characters of <code class="code">s</code> (in increasing index order) and stores the
    results in a new string that is returned.<br>
<b>Since</b> 4.00.0<br>
`],["String.trim",`
Return a copy of the argument, without leading and trailing
   whitespace.  The characters regarded as whitespace are: <code class="code">' '</code>,
   <code class="code">'\\012'</code>, <code class="code">'\\n'</code>, <code class="code">'\\r'</code>, and <code class="code">'\\t'</code>.  If there is neither leading nor
   trailing whitespace character in the argument, return the original
   string itself, not a copy.<br>
<b>Since</b> 4.00.0<br>
`],["String.escaped",`
Return a copy of the argument, with special characters
   represented by escape sequences, following the lexical
   conventions of OCaml.  If there is no special
   character in the argument, return the original string itself,
   not a copy. Its inverse function is Scanf.unescaped.
<p>

   Raise <code class="code">Invalid_argument</code> if the result is longer than
   <a href="https://reasonml.github.io/api/Sys.html#VALmax_string_length" target="_blank"><code class="code">Sys.max_string_length</code></a> bytes.<br>
</p>`],["String.uppercase",`
Return a copy of the argument, with all lowercase letters
   translated to uppercase, including accented letters of the ISO
   Latin-1 (8859-1) character set.<br>
`],["String.lowercase",`
Return a copy of the argument, with all uppercase letters
   translated to lowercase, including accented letters of the ISO
   Latin-1 (8859-1) character set.<br>
`],["String.capitalize",`
Return a copy of the argument, with the first character set to uppercase.<br>
`],["String.uncapitalize",`
Return a copy of the argument, with the first character set to lowercase.<br>
`],["String.index",`
<code class="code">String.index s c</code> returns the index of the first
   occurrence of character <code class="code">c</code> in string <code class="code">s</code>.
<p>

   Raise <code class="code">Not_found</code> if <code class="code">c</code> does not occur in <code class="code">s</code>.<br>
</p>`],["String.rindex",`
<code class="code">String.rindex s c</code> returns the index of the last
   occurrence of character <code class="code">c</code> in string <code class="code">s</code>.
<p>

   Raise <code class="code">Not_found</code> if <code class="code">c</code> does not occur in <code class="code">s</code>.<br>
</p>`],["String.index_from",`
<code class="code">String.index_from s i c</code> returns the index of the
   first occurrence of character <code class="code">c</code> in string <code class="code">s</code> after position <code class="code">i</code>.
   <code class="code">String.index s c</code> is equivalent to <code class="code">String.index_from s 0 c</code>.
<p>

   Raise <code class="code">Invalid_argument</code> if <code class="code">i</code> is not a valid position in <code class="code">s</code>.
   Raise <code class="code">Not_found</code> if <code class="code">c</code> does not occur in <code class="code">s</code> after position <code class="code">i</code>.<br>
</p>`],["String.rindex_from",`
<code class="code">String.rindex_from s i c</code> returns the index of the
   last occurrence of character <code class="code">c</code> in string <code class="code">s</code> before position <code class="code">i+1</code>.
   <code class="code">String.rindex s c</code> is equivalent to
   <code class="code">String.rindex_from s (String.length s - 1) c</code>.
<p>

   Raise <code class="code">Invalid_argument</code> if <code class="code">i+1</code> is not a valid position in <code class="code">s</code>.
   Raise <code class="code">Not_found</code> if <code class="code">c</code> does not occur in <code class="code">s</code> before position <code class="code">i+1</code>.<br>
</p>`],["String.contains",`
<code class="code">String.contains s c</code> tests if character <code class="code">c</code>
   appears in the string <code class="code">s</code>.<br>
`],["String.contains_from",`
<code class="code">String.contains_from s start c</code> tests if character <code class="code">c</code>
   appears in <code class="code">s</code> after position <code class="code">start</code>.
   <code class="code">String.contains s c</code> is equivalent to
   <code class="code">String.contains_from s 0 c</code>.
<p>

   Raise <code class="code">Invalid_argument</code> if <code class="code">start</code> is not a valid position in <code class="code">s</code>.<br>
</p>`],["String.rcontains_from",`
<code class="code">String.rcontains_from s stop c</code> tests if character <code class="code">c</code>
   appears in <code class="code">s</code> before position <code class="code">stop+1</code>.
<p>

   Raise <code class="code">Invalid_argument</code> if <code class="code">stop &lt; 0</code> or <code class="code">stop+1</code> is not a valid
   position in <code class="code">s</code>.<br>
</p>`],["String.length",`
Return the length (number of characters) of the given string.<br>
`],["List.append",`
Catenate two lists.  Same function as the infix operator <code class="code">@</code>.
   Not tail-recursive (length of the first argument).  The <code class="code">@</code>
   operator is not tail-recursive either.<br>
`],["List.rev_append",`
<code class="code">List.rev_append l1 l2</code> reverses <code class="code">l1</code> and concatenates it to <code class="code">l2</code>.
   This is equivalent to <a href="https://reasonml.github.io/api/List.html#VALrev" target="_blank"><code class="code">List.rev</code></a><code class="code"> l1 @ l2</code>, but <code class="code">rev_append</code> is
   tail-recursive and more efficient.<br>
`],["List.length",`
Return the length (number of elements) of the given list.<br>
`],["List.hd",`
Return the first element of the given list. Raise
   <code class="code">Failure "hd"</code> if the list is empty.<br>
`],["List.tl",`
Return the given list without its first element. Raise
   <code class="code">Failure "tl"</code> if the list is empty.<br>
`],["List.rev",`
List reversal.<br>
`],["List.nth",`
Return the <code class="code">n</code>-th element of the given list.
   The first element (head of the list) is at position 0.
   Raise <code class="code">Failure "nth"</code> if the list is too short.
   Raise <code class="code">Invalid_argument "List.nth"</code> if <code class="code">n</code> is negative.<br>
`],["List.concat",`
Concatenate a list of lists.  The elements of the argument are all
   concatenated together (in the same order) to give the result.
   Not tail-recursive
   (length of the argument + length of the longest sub-list).<br>
`],["List.flatten",`
Same as <code class="code">concat</code>.  Not tail-recursive
   (length of the argument + length of the longest sub-list).<br>
`],["List.map",`
<code class="code">List.map f [a1; ...; an]</code> applies function <code class="code">f</code> to <code class="code">a1, ..., an</code>,
   and builds the list <code class="code">[f a1; ...; f an]</code>
   with the results returned by <code class="code">f</code>.  Not tail-recursive.<br>
`],["List.rev_map",`
<code class="code">List.rev_map f l</code> gives the same result as
   <a href="https://reasonml.github.io/api/List.html#VALrev" target="_blank"><code class="code">List.rev</code></a><code class="code"> (</code><a href="https://reasonml.github.io/api/List.html#VALmap" target="_blank"><code class="code">List.map</code></a><code class="code"> f l)</code>, but is tail-recursive and
   more efficient.<br>
`],["List.mapi",`
Same as <a href="https://reasonml.github.io/api/List.html#VALmap" target="_blank"><code class="code">List.map</code></a>, but the function is applied to the index of
   the element as first argument (counting from 0), and the element
   itself as second argument.  Not tail-recursive.<br>
<b>Since</b> 4.00.0<br>
`],["List.fold_left",`
<code class="code">List.fold_left f a [b1; ...; bn]</code> is
   <code class="code">f (... (f (f a b1) b2) ...) bn</code>.<br>
`],["List.fold_right",`
<code class="code">List.fold_right f [a1; ...; an] b</code> is
   <code class="code">f a1 (f a2 (... (f an b) ...))</code>.  Not tail-recursive.<br>
`],["List.map2",`
<code class="code">List.map2 f [a1; ...; an] [b1; ...; bn]</code> is
   <code class="code">[f a1 b1; ...; f an bn]</code>.
   Raise <code class="code">Invalid_argument</code> if the two lists have
   different lengths.  Not tail-recursive.<br>
`],["List.rev_map2",`
<code class="code">List.rev_map2 f l1 l2</code> gives the same result as
   <a href="https://reasonml.github.io/api/List.html#VALrev" target="_blank"><code class="code">List.rev</code></a><code class="code"> (</code><a href="https://reasonml.github.io/api/List.html#VALmap2" target="_blank"><code class="code">List.map2</code></a><code class="code"> f l1 l2)</code>, but is tail-recursive and
   more efficient.<br>
`],["List.fold_left2",`
<code class="code">List.fold_left2 f a [b1; ...; bn] [c1; ...; cn]</code> is
   <code class="code">f (... (f (f a b1 c1) b2 c2) ...) bn cn</code>.
   Raise <code class="code">Invalid_argument</code> if the two lists have
   different lengths.<br>
`],["List.fold_right2",`
<code class="code">List.fold_right2 f [a1; ...; an] [b1; ...; bn] c</code> is
   <code class="code">f a1 b1 (f a2 b2 (... (f an bn c) ...))</code>.
   Raise <code class="code">Invalid_argument</code> if the two lists have
   different lengths.  Not tail-recursive.<br>
`],["List.exists",`
<code class="code">exists p [a1; ...; an]</code> checks if at least one element of
   the list satisfies the predicate <code class="code">p</code>. That is, it returns
   <code class="code">(p a1) || (p a2) || ... || (p an)</code>.<br>
`],["List.exists2",`
Same as <a href="https://reasonml.github.io/api/List.html#VALexists" target="_blank"><code class="code">List.exists</code></a>, but for a two-argument predicate.
   Raise <code class="code">Invalid_argument</code> if the two lists have
   different lengths.<br>
`],["List.mem",`
<code class="code">mem a l</code> is true if and only if <code class="code">a</code> is equal
   to an element of <code class="code">l</code>.<br>
`],["List.memq",`
Same as <a href="https://reasonml.github.io/api/List.html#VALmem" target="_blank"><code class="code">List.mem</code></a>, but uses physical equality instead of structural
   equality to compare list elements.<br>
`],["List.find",`
<code class="code">find p l</code> returns the first element of the list <code class="code">l</code>
   that satisfies the predicate <code class="code">p</code>.
   Raise <code class="code">Not_found</code> if there is no value that satisfies <code class="code">p</code> in the
   list <code class="code">l</code>.<br>
`],["List.filter",`
<code class="code">filter p l</code> returns all the elements of the list <code class="code">l</code>
   that satisfy the predicate <code class="code">p</code>.  The order of the elements
   in the input list is preserved.<br>
`],["List.find_all",`
<code class="code">find_all</code> is another name for <a href="https://reasonml.github.io/api/List.html#VALfilter" target="_blank"><code class="code">List.filter</code></a>.<br>
`],["List.sort",`
Sort a list in increasing order according to a comparison
   function.  The comparison function must return 0 if its arguments
   compare as equal, a positive integer if the first is greater,
   and a negative integer if the first is smaller (see Array.sort for
   a complete specification).  For example,
   <a href="https://reasonml.github.io/api/Pervasives.html#VALcompare" target="_blank"><code class="code">Pervasives.compare</code></a> is a suitable comparison function.
   The resulting list is sorted in increasing order.
   <code class="code">List.sort</code> is guaranteed to run in constant heap space
   (in addition to the size of the result list) and logarithmic
   stack space.
<p>

   The current implementation uses Merge Sort. It runs in constant
   heap space and logarithmic stack space.<br>
</p>`],["List.stable_sort",`
Same as <a href="https://reasonml.github.io/api/List.html#VALsort" target="_blank"><code class="code">List.sort</code></a>, but the sorting algorithm is guaranteed to
   be stable (i.e. elements that compare equal are kept in their
   original order) .
<p>

   The current implementation uses Merge Sort. It runs in constant
   heap space and logarithmic stack space.<br>
</p>`],["List.fast_sort",`
Same as <a href="https://reasonml.github.io/api/List.html#VALsort" target="_blank"><code class="code">List.sort</code></a> or <a href="https://reasonml.github.io/api/List.html#VALstable_sort" target="_blank"><code class="code">List.stable_sort</code></a>, whichever is faster
    on typical input.<br>
`],["List.sort_uniq",`
Same as <a href="https://reasonml.github.io/api/List.html#VALsort" target="_blank"><code class="code">List.sort</code></a>, but also remove duplicates.<br>
<b>Since</b> 4.02.0<br>
`],["List.merge",`
Merge two lists:
    Assuming that <code class="code">l1</code> and <code class="code">l2</code> are sorted according to the
    comparison function <code class="code">cmp</code>, <code class="code">merge cmp l1 l2</code> will return a
    sorted list containting all the elements of <code class="code">l1</code> and <code class="code">l2</code>.
    If several elements compare equal, the elements of <code class="code">l1</code> will be
    before the elements of <code class="code">l2</code>.
    Not tail-recursive (sum of the lengths of the arguments).<br>
`],["Array.length",`
Return the length (number of elements) of the given array.<br>
`],["Array.get",`
<code class="code">Array.get a n</code> returns the element number <code class="code">n</code> of array <code class="code">a</code>.
   The first element has number 0.
   The last element has number <code class="code">Array.length a - 1</code>.
   You can also write <code class="code">a.(n)</code> instead of <code class="code">Array.get a n</code>.
<p>

   Raise <code class="code">Invalid_argument "index out of bounds"</code>
   if <code class="code">n</code> is outside the range 0 to <code class="code">(Array.length a - 1)</code>.<br>
</p>`],["Array.set",`
<code class="code">Array.set a n x</code> modifies array <code class="code">a</code> in place, replacing
   element number <code class="code">n</code> with <code class="code">x</code>.
   You can also write <code class="code">a.(n) &lt;- x</code> instead of <code class="code">Array.set a n x</code>.
<p>

   Raise <code class="code">Invalid_argument "index out of bounds"</code>
   if <code class="code">n</code> is outside the range 0 to <code class="code">Array.length a - 1</code>.<br>
</p>`],["Array.make",`
<code class="code">Array.make n x</code> returns a fresh array of length <code class="code">n</code>,
   initialized with <code class="code">x</code>.
   All the elements of this new array are initially
   physically equal to <code class="code">x</code> (in the sense of the <code class="code">==</code> predicate).
   Consequently, if <code class="code">x</code> is mutable, it is shared among all elements
   of the array, and modifying <code class="code">x</code> through one of the array entries
   will modify all other entries at the same time.
<p>

   Raise <code class="code">Invalid_argument</code> if <code class="code">n &lt; 0</code> or <code class="code">n &gt; Sys.max_array_length</code>.
   If the value of <code class="code">x</code> is a floating-point number, then the maximum
   size is only <code class="code">Sys.max_array_length / 2</code>.<br>
</p>`],["Array.init",`
<code class="code">Array.init n f</code> returns a fresh array of length <code class="code">n</code>,
   with element number <code class="code">i</code> initialized to the result of <code class="code">f i</code>.
   In other terms, <code class="code">Array.init n f</code> tabulates the results of <code class="code">f</code>
   applied to the integers <code class="code">0</code> to <code class="code">n-1</code>.
<p>

   Raise <code class="code">Invalid_argument</code> if <code class="code">n &lt; 0</code> or <code class="code">n &gt; Sys.max_array_length</code>.
   If the return type of <code class="code">f</code> is <code class="code">float</code>, then the maximum
   size is only <code class="code">Sys.max_array_length / 2</code>.<br>
</p>`],["Array.make_matrix",`
<code class="code">Array.make_matrix dimx dimy e</code> returns a two-dimensional array
   (an array of arrays) with first dimension <code class="code">dimx</code> and
   second dimension <code class="code">dimy</code>. All the elements of this new matrix
   are initially physically equal to <code class="code">e</code>.
   The element (<code class="code">x,y</code>) of a matrix <code class="code">m</code> is accessed
   with the notation <code class="code">m.(x).(y)</code>.
<p>

   Raise <code class="code">Invalid_argument</code> if <code class="code">dimx</code> or <code class="code">dimy</code> is negative or
   greater than <code class="code">Sys.max_array_length</code>.
   If the value of <code class="code">e</code> is a floating-point number, then the maximum
   size is only <code class="code">Sys.max_array_length / 2</code>.<br>
</p>`],["Array.append",`
<code class="code">Array.append v1 v2</code> returns a fresh array containing the
   concatenation of the arrays <code class="code">v1</code> and <code class="code">v2</code>.<br>
`],["Array.concat",`
Same as <code class="code">Array.append</code>, but concatenates a list of arrays.<br>
`],["Array.sub",`
<code class="code">Array.sub a start len</code> returns a fresh array of length <code class="code">len</code>,
   containing the elements number <code class="code">start</code> to <code class="code">start + len - 1</code>
   of array <code class="code">a</code>.
<p>

   Raise <code class="code">Invalid_argument "Array.sub"</code> if <code class="code">start</code> and <code class="code">len</code> do not
   designate a valid subarray of <code class="code">a</code>; that is, if
   <code class="code">start &lt; 0</code>, or <code class="code">len &lt; 0</code>, or <code class="code">start + len &gt; Array.length a</code>.<br>
</p>`],["Array.copy",`
<code class="code">Array.copy a</code> returns a copy of <code class="code">a</code>, that is, a fresh array
   containing the same elements as <code class="code">a</code>.<br>
`],["Array.to_list",`
<code class="code">Array.to_list a</code> returns the list of all the elements of <code class="code">a</code>.<br>
`],["Array.of_list",`
<code class="code">Array.of_list l</code> returns a fresh array containing the elements
   of <code class="code">l</code>.<br>
`],["Array.map",`
<code class="code">Array.map f a</code> applies function <code class="code">f</code> to all the elements of <code class="code">a</code>,
   and builds an array with the results returned by <code class="code">f</code>:
   <code class="code">[| f a.(0); f a.(1); ...; f a.(Array.length a - 1) |]</code>.<br>
`],["Array.mapi",`
Same as <a href="https://reasonml.github.io/api/Array.html#VALmap" target="_blank"><code class="code">Array.map</code></a>, but the
   function is applied to the index of the element as first argument,
   and the element itself as second argument.<br>
`],["Array.fold_left",`
<code class="code">Array.fold_left f x a</code> computes
   <code class="code">f (... (f (f x a.(0)) a.(1)) ...) a.(n-1)</code>,
   where <code class="code">n</code> is the length of the array <code class="code">a</code>.<br>
`],["Array.fold_right",`
<code class="code">Array.fold_right f a x</code> computes
   <code class="code">f a.(0) (f a.(1) ( ... (f a.(n-1) x) ...))</code>,
   where <code class="code">n</code> is the length of the array <code class="code">a</code>.<br>
`],["Array.make_float",`
<code class="code">Array.make_float n</code> returns a fresh float array of length <code class="code">n</code>,
    with uninitialized data.<br>
<b>Since</b> 4.02<br>
`],["Array.sort",`
Sort an array in increasing order according to a comparison
   function.  The comparison function must return 0 if its arguments
   compare as equal, a positive integer if the first is greater,
   and a negative integer if the first is smaller (see below for a
   complete specification).  For example, <a href="https://reasonml.github.io/api/Pervasives.html#VALcompare" target="_blank"><code class="code">Pervasives.compare</code></a> is
   a suitable comparison function, provided there are no floating-point
   NaN values in the data.  After calling <code class="code">Array.sort</code>, the
   array is sorted in place in increasing order.
   <code class="code">Array.sort</code> is guaranteed to run in constant heap space
   and (at most) logarithmic stack space.
<p>

   The current implementation uses Heap Sort.  It runs in constant
   stack space.
</p><p>

   Specification of the comparison function:
   Let <code class="code">a</code> be the array and <code class="code">cmp</code> the comparison function.  The following
   must be true for all x, y, z in a :</p><ul>
<li>  <code class="code">cmp x y</code> &gt; 0 if and only if <code class="code">cmp y x</code> &lt; 0</li>
<li>  if <code class="code">cmp x y</code> &gt;= 0 and <code class="code">cmp y z</code> &gt;= 0 then <code class="code">cmp x z</code> &gt;= 0</li>
</ul>

   When <code class="code">Array.sort</code> returns, <code class="code">a</code> contains the same elements as before,
   reordered in such a way that for all i and j valid indices of <code class="code">a</code> :<ul>
<li>  <code class="code">cmp a.(i) a.(j)</code> &gt;= 0 if and only if i &gt;= j</li>
</ul>
<br>
`],["Array.stable_sort",`
Same as <a href="https://reasonml.github.io/api/Array.html#VALsort" target="_blank"><code class="code">Array.sort</code></a>, but the sorting algorithm is stable (i.e.
   elements that compare equal are kept in their original order) and
   not guaranteed to run in constant heap space.
<p>

   The current implementation uses Merge Sort. It uses <code class="code">n/2</code>
   words of heap space, where <code class="code">n</code> is the length of the array.
   It is usually faster than the current implementation of <a href="https://reasonml.github.io/api/Array.html#VALsort" target="_blank"><code class="code">Array.sort</code></a>.<br>
</p>`],["Array.fast_sort",`
Same as <a href="https://reasonml.github.io/api/Array.html#VALsort" target="_blank"><code class="code">Array.sort</code></a> or <a href="https://reasonml.github.io/api/Array.html#VALstable_sort" target="_blank"><code class="code">Array.stable_sort</code></a>, whichever is faster
    on typical input.<br>
`]
]);

export default map;