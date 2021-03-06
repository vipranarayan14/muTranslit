/**
 * Sanscript
 *
 * Sanscript is a Sanskrit transliteration library. Currently, it supports
 * other Indian languages only incidentally.
 *
 * Released under the MIT and GPL Licenses.
 */

(function(Sanscript) {
    "use strict";

    Sanscript.defaults = {
        skip_sgml: false,
        syncope: false
    };

    /* Schemes
     * =======
     * Schemes are of two kinds: "Brahmic" and "roman." "Brahmic" schemes
     * describe abugida scripts found in India. "Roman" schemes describe
     * manufactured alphabets that are meant to describe or encode Brahmi
     * scripts. Abugidas and alphabets are processed by separate algorithms
     * because of the unique difficulties involved with each.
     *
     * Brahmic consonants are stated without a virama. Roman consonants are
     * stated without the vowel 'a'.
     *
     * (Since "abugida" is not a well-known term, Sanscript uses "Brahmic"
     * and "roman" for clarity.)
     */
    var schemes = Sanscript.schemes = {

        /* Devanagari
         * ----------
         * The most comprehensive and unambiguous Brahmic script listed.
         */
        devanagari: {
            // "Independent" forms of the vowels. These are used whenever the
            // vowel does not immediately follow a consonant.
            vowels: 'अ आ इ ई उ ऊ ऋ ॠ ऌ ॡ ऎ ए ऐ ऒ ओ औ'.split(' '),

            // "Dependent" forms of the vowels. These are used whenever the
            // vowel immediately follows a consonant. If a letter is not
            // listed in `vowels`, it should not be listed here.
            vowel_marks: 'ा ि ी ु ू ृ ॄ ॢ ॣ ॆ े ै ॊ ो ौ'.split(' '),

            // Miscellaneous marks, all of which are used in Sanskrit.
            other_marks: 'ं ः ँ'.split(' '),

            // In syllabic scripts like Devanagari, consonants have an inherent
            // vowel that must be suppressed explicitly. We do so by putting a
            // virama after the consonant.
            virama: ['्'],

            // Various Sanskrit consonants and consonant clusters. Every token
            // here has an explicit vowel. Thus "क" is "ka" instead of "k".
            consonants: 'क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह ळ क्ष ज्ञ'.split(' '),

            // Numbers and punctuation
            symbols: '० १ २ ३ ४ ५ ६ ७ ८ ९ ॐ ऽ । ॥'.split(' '),

            // Zero-width joiner. This is used to separate a consonant cluster
            // and avoid a complex ligature.
            zwj: ['\u200D'],

            // Dummy consonant. This is used in ITRANS to prevert certain types
            // of parser ambiguity. Thus "barau" -> बरौ but "bara_u" -> बरउ.
            skip: [''],

            // Vedic accent. Udatta and anudatta.
            accent: ['\u0951', '\u0952'],

            // Accent combined with anusvara and and visarga. For compatibility
            // with ITRANS, which allows the reverse of these four.
            combo_accent: 'ः॑ ः॒ ं॑ ं॒'.split(' '),

            candra: ['ॅ'],

            // Non-Sanskrit consonants
            other: 'क़ ख़ ग़ ज़ ड़ ढ़ फ़ य़ ऱ'.split(' ')
        },

        /* Devanagari Unicode
         * ----------
         * The most comprehensive and unambiguous Brahmic script listed.
         */
        devanagariUC: {

            // "Independent" forms of the vowels. These are used whenever the
            // vowel does not immediately follow a consonant.
            vowels: ('\u0905 \u0906 \u0907 \u0908 \u0909 \u090A ' +
                     '\u090B \u0960 \u090C \u0961 \u090E \u090F ' +
                     '\u0910 \u0912 \u0913 \u0914').split(' '),

            // "Dependent" forms of the vowels. These are used whenever the
            // vowel immediately follows a consonant. If a letter is not
            // listed in `vowels`, it should not be listed here.
            vowel_marks: ('\u093E \u093F \u0940 \u0941 \u0942 ' +
                          '\u0943 \u0944 \u0962 \u0963 \u0946 ' +
                          '\u0947 \u0948 \u094A \u094B \u094C').split(' '),

            // Miscellaneous marks, all of which are used in Sanskrit.
            other_marks: '\u0902 \u0903 \u0901'.split(' '),

            // In syllabic scripts like Devanagari, consonants have an inherent
            // vowel that must be suppressed explicitly. We do so by putting a
            // virama after the consonant.
            virama: ['\u094D'],

            // Various Sanskrit consonants and consonant clusters. Every token
            // here has an explicit vowel. Thus "क" is "ka" instead of "k".
            consonants: ('\u0915 \u0916 \u0917 \u0918 \u0919 ' +
                         '\u091A \u091B \u091C \u091D \u091E ' +
                         '\u091F \u0920 \u0921 \u0922 \u0923 ' +
                         '\u0924 \u0925 \u0926 \u0927 \u0928 ' +
                         '\u092A \u092B \u092C \u092D \u092E ' +
                         '\u092F \u0930 \u0932 \u0935 \u0936 ' +
                         '\u0937 \u0938 \u0939 ' +
                         '\u0933 \u0915\u094D\u0937 \u091C\u094D\u091E').split(' '),

            // Numbers and punctuation
            symbols: ('\u0966 \u0967 \u0968 \u0969 \u096A ' +
                      '\u096B \u096C \u096D \u096E \u096F ' +
                      '\u0950 \u093D \u0964 \u0965').split(' '),

            // Zero-width joiner. This is used to separate a consonant cluster
            // and avoid a complex ligature.
            zwj: ['\u200D'],

            // Dummy consonant. This is used in ITRANS to prevert certain types
            // of parser ambiguity. Thus "barau" -> बरौ but "bara_u" -> बरउ.
            skip: [''],

            // Vedic accent. Udatta and anudatta.
            accent: ['\u0951', '\u0952'],

            // Accent combined with anusvara and and visarga. For compatibility
            // with ITRANS, which allows the reverse of these four.
            combo_accent: '\u0903\u0951 \u0903\u0952 \u0902\u0951 \u0902\u0952'.split(' '),

            candra: ['\u0945'],

            // Non-Sanskrit consonants
            other: '\u0958 \u0959 \u095A \u095B \u095C \u095D \u095E \u095F \u0931'.split(' ')
        },

        /* Tamil
         * -----
         * Missing R/RR/lR/lRR vowel marks and voice/aspiration distinctions.
         * The most incomplete of the Sanskrit schemes here.
         */
        tamil: {
            vowels: 'அ ஆ இ ஈ உ ஊ     எ ஏ ஐ ஒ ஓ ஔ'.split(' '),
            vowel_marks: 'ா ி ீ ு ூ     ெ ே ை ொ ோ ௌ'.split(' '),
            other_marks: 'ஂ ஃ '.split(' '),
            virama: ['்'],
            consonants: 'க க க க ங ச ச ஜ ச ஞ ட ட ட ட ண த த த த ந ப ப ப ப ம ய ர ல வ ஶ ஷ ஸ ஹ ள க்ஷ ஜ்ஞ ன ழ'.split(' '),
            symbols: '௦ ௧ ௨ ௩ ௪ ௫ ௬ ௭ ௮ ௯ ௐ ऽ । ॥'.split(' '),
            other: '        ற'.split(' ')
        },

        /* Tamil Unicode
         * -----
         * Missing R/RR/lR/lRR vowel marks and voice/aspiration distinctions.
         * The most incomplete of the Sanskrit schemes here.
         */
        tamilUC: {
            vowels: ('\u0B85 \u0B86 \u0B87 \u0B88 \u0B89 \u0B8A ' +
                     '    \u0B8E \u0B8F \u0B90 \u0B92 \u0B93 \u0B94').split(' '),
            vowel_marks: ('\u0BBE \u0BBF \u0BC0 \u0BC1 \u0BC2 '+
                          '     \u0BC6 \u0BC7 \u0BC8 \u0BCA \u0BCB \u0BCC').split(' '),
            other_marks: ('\u0B82 \u0BC3 ').split(' '),
            virama: ['\u0BCD'],
            consonants: ('\u0B95 \u0B95 \u0B95 \u0B95 \u0B99 ' +
                         '\u0B9A \u0B9A \u0B9C \u0B9A \u0B9E ' +
                         '\u0B9F \u0B9F \u0B9F \u0B9F \u0BA3 ' +
                         '\u0BA4 \u0BA4 \u0BA4 \u0BA4 \u0BA8 ' +
                         '\u0BAA \u0BAA \u0BAA \u0BAA \u0BAE ' +
                         '\u0BAF \u0BB0 \u0BB2 \u0BB5 \u0BB6 ' +
                         '\u0BB7 \u0BB8 \u0BB9 \u0BB3 ' +
                         '\u0B95\u0BCD\u0BB7 \u0B9C\u0BCD\u0B9E \u0BA9 \u0BB4').split(' '),
            symbols: ('\u0BE6 \u0BE7 \u0BE8 \u0BE9 \u0BEA ' +
                      '\u0BEB \u0BEC \u0BED \u0BEE \u0BEF ' +
                      '\u0BD0 \u093D \u0964 \u0965').split(' '),
            other: ('        \u0BB1').split(' ')
        },

        /* International Alphabet of Sanskrit Transliteration
         * --------------------------------------------------
         * The most "professional" Sanskrit romanization scheme.
         */
        iast: {
            vowels: 'a ā i ī u ū ṛ ṝ ḷ ḹ  e ai  o au'.split(' '),
            other_marks: ['ṃ', 'ḥ', '~'],
            virama: [''],
            consonants: 'k kh g gh ṅ c ch j jh ñ ṭ ṭh ḍ ḍh ṇ t th d dh n p ph b bh m y r l v ś ṣ s h ḻ kṣ jñ'.split(' '),
            symbols: "0 1 2 3 4 5 6 7 8 9 oṃ ' । ॥".split(' ')
        },

        /* ITRANS
         * ------
         * One of the first romanization schemes -- and one of the most
         * complicated. For alternate forms, see the "allAlternates" variable
         * below.
         *
         * '_' is a "null" letter, which allows adjacent vowels.
         */
        itrans: {
            vowels: 'a A i I u U RRi RRI LLi LLI e E ai o O au'.split(' '),
            other_marks: ['M', 'H', '.N'],
            virama: [''],
            consonants: 'k kh g gh ~N ch Ch j jh ~n T Th D Dh N t th d dh n p ph b bh m y r l v sh Sh s h L kSh j~n ^n z'.split(' '),
            symbols: '0 1 2 3 4 5 6 7 8 9 OM .a | ||'.split(' '),
            candra: ['.c'],
            zwj: ['{}'],
            skip: '_',
            accent: ["\\'", "\\_"],
            combo_accent: "\\'H \\_H \\'M \\_M".split(' '),
            other: 'q K G z .D .Dh f Y R'.split(' ')
        },

    },

    // Set of names of schemes
    romanSchemes = {},

    // Map of alternate encodings.
    allAlternates = {
        itrans: {
            A: ['aa'],
            I: ['ii', 'ee'],
            U: ['uu', 'oo'],
            RRi: ['R^i'],
            RRI: ['R^I'],
            LLi: ['L^i'],
            LLI: ['L^I'],
            M: ['.m', '.n'],
            '~N': ['N^'],
            ch: ['c'],
            Ch: ['C', 'chh'],
            '~n': ['JN'],
            v: ['w'],
            Sh: ['S', 'shh'],
            kSh: ['kS', 'x'],
            'j~n': ['GY', 'dny'],
            OM: ['AUM'],
            "\\_": ["\\`"],
            "\\_H": ["\\`H"],
            "\\'M": ["\\'.m", "\\'.n"],
            "\\_M": "\\_.m \\_.n \\`M \\`.m \\`.n".split(' '),
            ".a": ['~'],
            '|': ['.'],
            '||': ['..'],
            z: ['J']
        }
    },

    // object cache
    cache = {};

    /**
     * Check whether the given scheme encodes romanized Sanskrit.
     *
     * @param name  the scheme name
     * @return      boolean
     */
    Sanscript.isRomanScheme = function(name) {
        return romanSchemes.hasOwnProperty(name);
    };

    /**
     * Add a Brahmic scheme to Sanscript.
     *
     * Schemes are of two types: "Brahmic" and "roman". Brahmic consonants
     * have an inherent vowel sound, but roman consonants do not. This is the
     * main difference between these two types of scheme.
     *
     * A scheme definition is an object ("{}") that maps a group name to a
     * list of characters. For illustration, see the "devanagari" scheme at
     * the top of this file.
     *
     * You can use whatever group names you like, but for the best results,
     * you should use the same group names that Sanscript does.
     *
     * @param name    the scheme name
     * @param scheme  the scheme data itself. This should be constructed as
     *                described above.
     */
    Sanscript.addBrahmicScheme = function(name, scheme) {
        Sanscript.schemes[name] = scheme;
    };

    /**
     * Add a roman scheme to Sanscript.
     *
     * See the comments on Sanscript.addBrahmicScheme. The "vowel_marks" field
     * can be omitted.
     *
     * @param name    the scheme name
     * @param scheme  the scheme data itself
     */
    Sanscript.addRomanScheme = function(name, scheme) {
        if (!('vowel_marks' in scheme)) {
            scheme.vowel_marks = scheme.vowels.slice(1);
        }
        Sanscript.schemes[name] = scheme;
        romanSchemes[name] = true;
    };

    /**
     * Create a deep copy of an object, for certain kinds of objects.
     *
     * @param scheme  the scheme to copy
     * @return        the copy
     */
    var cheapCopy = function(scheme) {
        var copy = {};
        for (var key in scheme) {
            if (!scheme.hasOwnProperty(key)) {
                continue;
            }
            copy[key] = scheme[key].slice(0);
        }
        return copy;
    };

    // Set up various schemes
    (function() {
        // Set up roman schemes
        //var kolkata = schemes.kolkata = cheapCopy(schemes.iast);
          var  schemeNames = 'iast itrans'.split(' ');
        //kolkata.vowels = 'a ā i ī u ū ṛ ṝ ḷ ḹ e ē ai o ō au'.split(' ');

        // These schemes already belong to Sanscript.schemes. But by adding
        // them again with `addRomanScheme`, we automatically build up
        // `romanSchemes` and define a `vowel_marks` field for each one.
        for (var i = 0, name; (name = schemeNames[i]); i++) {
            Sanscript.addRomanScheme(name, schemes[name]);
        }

        // ITRANS variant, which supports Dravidian short 'e' and 'o'.
        var itrans_dravidian = cheapCopy(schemes.itrans);
        itrans_dravidian.vowels = 'a A i I u U Ri RRI LLi LLi e E ai o O au'.split(' ');
        itrans_dravidian.vowel_marks = itrans_dravidian.vowels.slice(1);
        allAlternates.itrans_dravidian = allAlternates.itrans;
        Sanscript.addRomanScheme('itrans_dravidian', itrans_dravidian);
    }());

    /**
     * Create a map from every character in `from` to its partner in `to`.
     * Also, store any "marks" that `from` might have.
     *
     * @param from     input scheme
     * @param to       output scheme
     * @param options  scheme options
     */
    var makeMap = function(from, to, options) {
        var alternates = allAlternates[from] || {},
            consonants = {},
            fromScheme = Sanscript.schemes[from],
            letters = {},
            tokenLengths = [],
            marks = {},
            toScheme = Sanscript.schemes[to];

        for (var group in fromScheme) {
            if (!fromScheme.hasOwnProperty(group)) {
                continue;
            }
            var fromGroup = fromScheme[group],
                toGroup = toScheme[group];
            if (toGroup === undefined) {
                continue;
            }
            for (var i = 0; i < fromGroup.length; i++) {
                var F = fromGroup[i],
                    T = toGroup[i],
                    alts = alternates[F] || [],
                    numAlts = alts.length,
                    j = 0;

                tokenLengths.push(F.length);
                for (j = 0; j < numAlts; j++) {
                    tokenLengths.push(alts[j].length);
                }

                if (group === 'vowel_marks' || group === 'virama') {
                    marks[F] = T;
                    for (j = 0; j < numAlts; j++) {
                        marks[alts[j]] = T;
                    }
                } else {
                    letters[F] = T;
                    for (j = 0; j < numAlts; j++) {
                        letters[alts[j]] = T;
                    }
                    if (group === 'consonants' || group === 'other') {
                        consonants[F] = T;

                        for (j = 0; j < numAlts; j++) {
                            consonants[alts[j]] = T;
                        }
                    }
                }
            }
        }

        return {consonants: consonants,
            fromRoman: Sanscript.isRomanScheme(from),
            letters: letters,
            marks: marks,
            maxTokenLength: Math.max.apply(Math, tokenLengths),
            toRoman: Sanscript.isRomanScheme(to),
            virama: toScheme.virama};
    };

    /**
     * Transliterate from a romanized script.
     *
     * @param data     the string to transliterate
     * @param map      map data generated from makeMap()
     * @param options  transliteration options
     * @return         the finished string
     */
    var transliterateRoman = function(data, map, options) {
        var buf = [],
            consonants = map.consonants,
            dataLength = data.length,
            hadConsonant = false,
            letters = map.letters,
            marks = map.marks,
            maxTokenLength = map.maxTokenLength,
            optSkipSGML = options.skip_sgml,
            optSyncope = options.syncope,
            tempLetter,
            tempMark,
            tokenBuffer = '',
            toRoman = map.toRoman,
            virama = map.virama;

        // Transliteration state. It's controlled by these values:
        // - `skippingSGML`: are we in SGML?
        // - `toggledTrans`: are we in a toggled region?
        //
        // We combine these values into a single variable `skippingTrans`:
        //
        //     `skippingTrans` = skippingSGML || toggledTrans;
        //
        // If (and only if) this value is true, don't transliterate.
        var skippingSGML = false,
            skippingTrans = false,
            toggledTrans = false;

        for (var i = 0, L; (L = data.charAt(i)) || tokenBuffer; i++) {
            // Fill the token buffer, if possible.
            var difference = maxTokenLength - tokenBuffer.length;
            if (difference > 0 && i < dataLength) {
                tokenBuffer += L;
                if (difference > 1) {
                    continue;
                }
            }

            // Match all token substrings to our map.
            for (var j = 0; j < maxTokenLength; j++) {
                var token = tokenBuffer.substr(0,maxTokenLength-j);

                if (skippingSGML === true) {
                    skippingSGML = (token !== '>');
                } else if (token === '<') {
                    skippingSGML = optSkipSGML;
                } else if (token === '##') {
                    toggledTrans = !toggledTrans;
                    tokenBuffer = tokenBuffer.substr(2);
                    break;
                }
                skippingTrans = skippingSGML || toggledTrans;
                if ((tempLetter = letters[token]) !== undefined && !skippingTrans) {
                    if (toRoman) {
                        buf.push(tempLetter);
                    } else {
                        // Handle the implicit vowel. Ignore 'a' and force
                        // vowels to appear as marks if we've just seen a
                        // consonant.
                        if (hadConsonant) {
                            if ((tempMark = marks[token])) {
                                buf.push(tempMark);
                            } else if (token !== 'a') {
                                buf.push(virama);
                                buf.push(tempLetter);
                            }
                        } else {
                            buf.push(tempLetter);
                        }
                        hadConsonant = token in consonants;
                    }
                    tokenBuffer = tokenBuffer.substr(maxTokenLength-j);
                    break;
                } else if (j === maxTokenLength - 1) {
                    if (hadConsonant) {
                        hadConsonant = false;
                        if (!optSyncope) {
                            buf.push(virama);
                        }
                    }
                    buf.push(token);
                    tokenBuffer = tokenBuffer.substr(1);
                    // 'break' is redundant here, "j == ..." is true only on
                    // the last iteration.
                }
            }
        }
        if (hadConsonant && !optSyncope) {
            buf.push(virama);
        }
        return buf.join('');
    };

    /**
     * Transliterate from a Brahmic script.
     *
     * @param data     the string to transliterate
     * @param map      map data generated from makeMap()
     * @param options  transliteration options
     * @return         the finished string
     */
    var transliterateBrahmic = function(data, map, options) {
        var buf = [],
            consonants = map.consonants,
            danglingHash = false,
            hadRomanConsonant = false,
            letters = map.letters,
            marks = map.marks,
            temp,
            toRoman = map.toRoman,
            skippingTrans = false;

        for (var i = 0, L; (L = data.charAt(i)); i++) {
            // Toggle transliteration state
            if (L === '#') {
                if (danglingHash) {
                    skippingTrans = !skippingTrans;
                    danglingHash = false;
                } else {
                    danglingHash = true;
                }
                if (hadRomanConsonant) {
                    buf.push('a');
                    hadRomanConsonant = false;
                }
                continue;
            } else if (skippingTrans) {
                buf.push(L);
                continue;
            }

            if ((temp = marks[L]) !== undefined) {
                buf.push(temp);
                hadRomanConsonant = false;
            } else {
                if (danglingHash) {
                    buf.push('#');
                    danglingHash = false;
                }
                if (hadRomanConsonant) {
                    buf.push('a');
                    hadRomanConsonant = false;
                }

                // Push transliterated letter if possible. Otherwise, push
                // the letter itself.
                if ((temp = letters[L])) {
                    buf.push(temp);
                    hadRomanConsonant = toRoman && (L in consonants);
                } else {
                    buf.push(L);
                }
            }
        }
        if (hadRomanConsonant) {
            buf.push('a');
        }
        return buf.join('');
    };

    /**
     * Transliterate from one script to another.
     *
     * @param data     the string to transliterate
     * @param from     the source script
     * @param to       the destination script
     * @param options  transliteration options
     * @return         the finished string
     */
    Sanscript.t = function(data, from, to, options) {
        options = options || {};
        var cachedOptions = cache.options || {},
            defaults = Sanscript.defaults,
            hasPriorState = (cache.from === from && cache.to === to),
            map;

        // Here we simultaneously build up an `options` object and compare
        // these options to the options from the last run.
        for (var key in defaults) {
            if (defaults.hasOwnProperty(key)) {
                var value = defaults[key];
                if (key in options) {
                    value = options[key];
                }
                options[key] = value;

                // This comparison method is not generalizable, but since these
                // objects are associative arrays with identical keys and with
                // values of known type, it works fine here.
                if (value !== cachedOptions[key]) {
                    hasPriorState = false;
                }
            }
        }

        if (hasPriorState) {
            map = cache.map;
        } else {
            map = makeMap(from, to, options);
            cache = {
                from: from,
                map: map,
                options: options,
                to: to};
        }

        // Easy way out for "{\m+}", "\", and ".h".
        if (from === 'itrans') {
            data = data.replace(/\{\\m\+\}/g, ".h.N");
            data = data.replace(/\.h/g, '');
            data = data.replace(/\\([^'`_]|$)/g, "##$1##");
        }

        if (map.fromRoman) {
            return transliterateRoman(data, map, options);
        } else {
            return transliterateBrahmic(data, map, options);
        }
    };
}(window.Sanscript = window.Sanscript || {}));
