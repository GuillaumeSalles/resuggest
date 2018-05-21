// Generated by BUCKLESCRIPT VERSION 3.0.1, PLEASE EDIT WITH CARE
'use strict';

var Char = require("bs-platform/lib/js/char");
var List = require("bs-platform/lib/js/list");
var $$Array = require("bs-platform/lib/js/array");
var Curry = require("bs-platform/lib/js/curry");
var $$String = require("bs-platform/lib/js/string");
var Caml_obj = require("bs-platform/lib/js/caml_obj");
var Caml_array = require("bs-platform/lib/js/caml_array");
var Caml_float = require("bs-platform/lib/js/caml_float");
var Caml_int32 = require("bs-platform/lib/js/caml_int32");
var Pervasives = require("bs-platform/lib/js/pervasives");
var Caml_format = require("bs-platform/lib/js/caml_format");
var Caml_string = require("bs-platform/lib/js/caml_string");

var f0_001 = /* :: */[
  /* tuple */[
    Caml_obj.caml_equal,
    "(==)"
  ],
  /* :: */[
    /* tuple */[
      Caml_obj.caml_notequal,
      "(!=)"
    ],
    /* :: */[
      /* tuple */[
        Caml_obj.caml_lessthan,
        "(<)"
      ],
      /* :: */[
        /* tuple */[
          Caml_obj.caml_greaterthan,
          "(>)"
        ],
        /* :: */[
          /* tuple */[
            Caml_obj.caml_lessequal,
            "(<=)"
          ],
          /* :: */[
            /* tuple */[
              Caml_obj.caml_greaterequal,
              "(>=)"
            ],
            /* :: */[
              /* tuple */[
                (function (prim, prim$1) {
                    return prim === prim$1;
                  }),
                "(===)"
              ],
              /* :: */[
                /* tuple */[
                  (function (prim, prim$1) {
                      return prim !== prim$1;
                    }),
                  "(!==)"
                ],
                /* [] */0
              ]
            ]
          ]
        ]
      ]
    ]
  ]
];

var f0 = /* tuple */[
  "'a -> 'a -> bool",
  f0_001
];

var f1_001 = /* :: */[
  /* tuple */[
    Caml_obj.caml_compare,
    "compare"
  ],
  /* [] */0
];

var f1 = /* tuple */[
  "'a -> 'a -> int",
  f1_001
];

var f2_001 = /* :: */[
  /* tuple */[
    Caml_obj.caml_min,
    "min"
  ],
  /* :: */[
    /* tuple */[
      Caml_obj.caml_max,
      "max"
    ],
    /* [] */0
  ]
];

var f2 = /* tuple */[
  "'a -> 'a -> 'a",
  f2_001
];

var f3_001 = /* :: */[
  /* tuple */[
    (function (prim) {
        return !prim;
      }),
    "(!)"
  ],
  /* [] */0
];

var f3 = /* tuple */[
  "bool -> bool",
  f3_001
];

var f4_001 = /* :: */[
  /* tuple */[
    (function (prim, prim$1) {
        if (prim) {
          return prim$1;
        } else {
          return false;
        }
      }),
    "(&&)"
  ],
  /* :: */[
    /* tuple */[
      (function (prim, prim$1) {
          if (prim) {
            return true;
          } else {
            return prim$1;
          }
        }),
      "(||)"
    ],
    /* [] */0
  ]
];

var f4 = /* tuple */[
  "bool -> bool -> bool",
  f4_001
];

var f5_001 = /* :: */[
  /* tuple */[
    (function (prim, prim$1) {
        return Curry._1(prim$1, prim);
      }),
    "(|>)"
  ],
  /* [] */0
];

var f5 = /* tuple */[
  "'a -> ('a -> 'b) -> 'b",
  f5_001
];

var f6_001 = /* :: */[
  /* tuple */[
    (function (prim, prim$1) {
        return Curry._1(prim, prim$1);
      }),
    "(@@)"
  ],
  /* [] */0
];

var f6 = /* tuple */[
  "('a -> 'b) -> 'a -> 'b",
  f6_001
];

var f7_001 = /* :: */[
  /* tuple */[
    (function (prim) {
        return -prim | 0;
      }),
    "(~-)"
  ],
  /* :: */[
    /* tuple */[
      (function (prim) {
          return prim;
        }),
      "(~+)"
    ],
    /* :: */[
      /* tuple */[
        (function (prim) {
            return prim + 1 | 0;
          }),
        "succ"
      ],
      /* :: */[
        /* tuple */[
          (function (prim) {
              return prim - 1 | 0;
            }),
          "pred"
        ],
        /* :: */[
          /* tuple */[
            Pervasives.abs,
            "abs"
          ],
          /* :: */[
            /* tuple */[
              Pervasives.lnot,
              "lnot"
            ],
            /* [] */0
          ]
        ]
      ]
    ]
  ]
];

var f7 = /* tuple */[
  "int -> int",
  f7_001
];

var f8_001 = /* :: */[
  /* tuple */[
    (function (prim, prim$1) {
        return prim + prim$1 | 0;
      }),
    "(+)"
  ],
  /* :: */[
    /* tuple */[
      (function (prim, prim$1) {
          return prim - prim$1 | 0;
        }),
      "(-)"
    ],
    /* :: */[
      /* tuple */[
        Caml_int32.imul,
        "(*)"
      ],
      /* :: */[
        /* tuple */[
          Caml_int32.div,
          "(/)"
        ],
        /* :: */[
          /* tuple */[
            Caml_int32.mod_,
            "(mod)"
          ],
          /* :: */[
            /* tuple */[
              (function (prim, prim$1) {
                  return prim & prim$1;
                }),
              "(land)"
            ],
            /* :: */[
              /* tuple */[
                (function (prim, prim$1) {
                    return prim | prim$1;
                  }),
                "(lor)"
              ],
              /* :: */[
                /* tuple */[
                  (function (prim, prim$1) {
                      return prim ^ prim$1;
                    }),
                  "(lxor)"
                ],
                /* :: */[
                  /* tuple */[
                    (function (prim, prim$1) {
                        return (prim << prim$1);
                      }),
                    "(lsl)"
                  ],
                  /* :: */[
                    /* tuple */[
                      (function (prim, prim$1) {
                          return (prim >>> prim$1) | 0;
                        }),
                      "(lsr)"
                    ],
                    /* :: */[
                      /* tuple */[
                        (function (prim, prim$1) {
                            return (prim >> prim$1);
                          }),
                        "(asr)"
                      ],
                      /* [] */0
                    ]
                  ]
                ]
              ]
            ]
          ]
        ]
      ]
    ]
  ]
];

var f8 = /* tuple */[
  "int -> int -> int",
  f8_001
];

var f9_001 = /* :: */[
  /* tuple */[
    (function (prim) {
        return -prim;
      }),
    "(~-.)"
  ],
  /* :: */[
    /* tuple */[
      (function (prim) {
          return prim;
        }),
      "(~+.)"
    ],
    /* :: */[
      /* tuple */[
        (function (prim) {
            return Math.sqrt(prim);
          }),
        "sqrt"
      ],
      /* :: */[
        /* tuple */[
          (function (prim) {
              return Math.exp(prim);
            }),
          "exp"
        ],
        /* :: */[
          /* tuple */[
            (function (prim) {
                return Math.log(prim);
              }),
            "log"
          ],
          /* :: */[
            /* tuple */[
              (function (prim) {
                  return Math.log10(prim);
                }),
              "log10"
            ],
            /* :: */[
              /* tuple */[
                Caml_float.caml_expm1_float,
                "expm1"
              ],
              /* :: */[
                /* tuple */[
                  (function (prim) {
                      return Math.log1p(prim);
                    }),
                  "log1p"
                ],
                /* :: */[
                  /* tuple */[
                    (function (prim) {
                        return Math.cos(prim);
                      }),
                    "cos"
                  ],
                  /* :: */[
                    /* tuple */[
                      (function (prim) {
                          return Math.sin(prim);
                        }),
                      "sin"
                    ],
                    /* :: */[
                      /* tuple */[
                        (function (prim) {
                            return Math.tan(prim);
                          }),
                        "tan"
                      ],
                      /* :: */[
                        /* tuple */[
                          (function (prim) {
                              return Math.acos(prim);
                            }),
                          "acos"
                        ],
                        /* :: */[
                          /* tuple */[
                            (function (prim) {
                                return Math.asin(prim);
                              }),
                            "asin"
                          ],
                          /* :: */[
                            /* tuple */[
                              (function (prim) {
                                  return Math.atan(prim);
                                }),
                              "atan"
                            ],
                            /* :: */[
                              /* tuple */[
                                (function (prim) {
                                    return Math.cosh(prim);
                                  }),
                                "cosh"
                              ],
                              /* :: */[
                                /* tuple */[
                                  (function (prim) {
                                      return Math.sinh(prim);
                                    }),
                                  "sinh"
                                ],
                                /* :: */[
                                  /* tuple */[
                                    (function (prim) {
                                        return Math.tanh(prim);
                                      }),
                                    "tanh"
                                  ],
                                  /* :: */[
                                    /* tuple */[
                                      (function (prim) {
                                          return Math.ceil(prim);
                                        }),
                                      "ceil"
                                    ],
                                    /* :: */[
                                      /* tuple */[
                                        (function (prim) {
                                            return Math.floor(prim);
                                          }),
                                        "floor"
                                      ],
                                      /* :: */[
                                        /* tuple */[
                                          (function (prim) {
                                              return Math.abs(prim);
                                            }),
                                          "abs_float"
                                        ],
                                        /* [] */0
                                      ]
                                    ]
                                  ]
                                ]
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]
                ]
              ]
            ]
          ]
        ]
      ]
    ]
  ]
];

var f9 = /* tuple */[
  "float -> float",
  f9_001
];

var f10_001 = /* :: */[
  /* tuple */[
    (function (prim, prim$1) {
        return prim + prim$1;
      }),
    "(+.)"
  ],
  /* :: */[
    /* tuple */[
      (function (prim, prim$1) {
          return prim - prim$1;
        }),
      "(-.)"
    ],
    /* :: */[
      /* tuple */[
        (function (prim, prim$1) {
            return prim * prim$1;
          }),
        "(*.)"
      ],
      /* :: */[
        /* tuple */[
          (function (prim, prim$1) {
              return prim / prim$1;
            }),
          "(/.)"
        ],
        /* :: */[
          /* tuple */[
            (function (prim, prim$1) {
                return Math.pow(prim, prim$1);
              }),
            "(**)"
          ],
          /* :: */[
            /* tuple */[
              (function (prim, prim$1) {
                  return Math.atan2(prim, prim$1);
                }),
              "atan2"
            ],
            /* :: */[
              /* tuple */[
                Caml_float.caml_hypot_float,
                "hypot"
              ],
              /* :: */[
                /* tuple */[
                  Caml_float.caml_copysign_float,
                  "copysign"
                ],
                /* :: */[
                  /* tuple */[
                    (function (prim, prim$1) {
                        return prim % prim$1;
                      }),
                    "mod_float"
                  ],
                  /* [] */0
                ]
              ]
            ]
          ]
        ]
      ]
    ]
  ]
];

var f10 = /* tuple */[
  "float -> float -> float",
  f10_001
];

var f11_001 = /* :: */[
  /* tuple */[
    Caml_float.caml_frexp_float,
    "frexp"
  ],
  /* [] */0
];

var f11 = /* tuple */[
  "float -> float * int",
  f11_001
];

var f12_001 = /* :: */[
  /* tuple */[
    Caml_float.caml_ldexp_float,
    "ldexp"
  ],
  /* [] */0
];

var f12 = /* tuple */[
  "float -> int -> float",
  f12_001
];

var f13_001 = /* :: */[
  /* tuple */[
    Caml_float.caml_modf_float,
    "modf"
  ],
  /* [] */0
];

var f13 = /* tuple */[
  "float -> float * float",
  f13_001
];

var f14_001 = /* :: */[
  /* tuple */[
    (function (prim) {
        return prim;
      }),
    "float"
  ],
  /* :: */[
    /* tuple */[
      (function (prim) {
          return prim;
        }),
      "float_of_int"
    ],
    /* [] */0
  ]
];

var f14 = /* tuple */[
  "int -> float",
  f14_001
];

var f15_001 = /* :: */[
  /* tuple */[
    (function (prim) {
        return prim | 0;
      }),
    "truncate"
  ],
  /* :: */[
    /* tuple */[
      (function (prim) {
          return prim | 0;
        }),
      "int_of_float"
    ],
    /* [] */0
  ]
];

var f15 = /* tuple */[
  "float -> int",
  f15_001
];

var f16_001 = /* :: */[
  /* tuple */[
    (function (prim, prim$1) {
        return prim + prim$1;
      }),
    "(++)"
  ],
  /* [] */0
];

var f16 = /* tuple */[
  "string -> string -> string",
  f16_001
];

var f17_001 = /* :: */[
  /* tuple */[
    (function (prim) {
        return prim;
      }),
    "int_of_char"
  ],
  /* :: */[
    /* tuple */[
      (function (prim) {
          return prim;
        }),
      "Char.code"
    ],
    /* [] */0
  ]
];

var f17 = /* tuple */[
  "char -> int",
  f17_001
];

var f18_001 = /* :: */[
  /* tuple */[
    Pervasives.char_of_int,
    "char_of_int"
  ],
  /* :: */[
    /* tuple */[
      Char.chr,
      "Char.chr"
    ],
    /* [] */0
  ]
];

var f18 = /* tuple */[
  "int -> char",
  f18_001
];

var f19_001 = /* :: */[
  /* tuple */[
    Pervasives.string_of_bool,
    "string_of_bool"
  ],
  /* [] */0
];

var f19 = /* tuple */[
  "bool -> string",
  f19_001
];

var f20_001 = /* :: */[
  /* tuple */[
    Pervasives.bool_of_string,
    "bool_of_string"
  ],
  /* [] */0
];

var f20 = /* tuple */[
  "string -> bool",
  f20_001
];

var f21_001 = /* :: */[
  /* tuple */[
    (function (prim) {
        return String(prim);
      }),
    "string_of_int"
  ],
  /* [] */0
];

var f21 = /* tuple */[
  "int -> string",
  f21_001
];

var f22_001 = /* :: */[
  /* tuple */[
    Caml_format.caml_int_of_string,
    "int_of_string"
  ],
  /* :: */[
    /* tuple */[
      (function (prim) {
          return prim.length;
        }),
      "String.length"
    ],
    /* [] */0
  ]
];

var f22 = /* tuple */[
  "string -> int",
  f22_001
];

var f23_001 = /* :: */[
  /* tuple */[
    Pervasives.string_of_float,
    "string_of_float"
  ],
  /* [] */0
];

var f23 = /* tuple */[
  "float -> string",
  f23_001
];

var f24_001 = /* :: */[
  /* tuple */[
    Caml_format.caml_float_of_string,
    "float_of_string"
  ],
  /* [] */0
];

var f24 = /* tuple */[
  "string -> float",
  f24_001
];

var f25_001 = /* :: */[
  /* tuple */[
    (function (prim) {
        return prim[0];
      }),
    "fst"
  ],
  /* [] */0
];

var f25 = /* tuple */[
  "'a * 'b -> 'a",
  f25_001
];

var f26_001 = /* :: */[
  /* tuple */[
    (function (prim) {
        return prim[1];
      }),
    "snd"
  ],
  /* [] */0
];

var f26 = /* tuple */[
  "'a * 'b -> 'b",
  f26_001
];

var f27_001 = /* :: */[
  /* tuple */[
    Pervasives.$at,
    "(@)"
  ],
  /* :: */[
    /* tuple */[
      List.append,
      "List.append"
    ],
    /* :: */[
      /* tuple */[
        List.rev_append,
        "List.rev_append"
      ],
      /* [] */0
    ]
  ]
];

var f27 = /* tuple */[
  "'a list -> 'a list -> 'a list",
  f27_001
];

var f28_001 = /* :: */[
  /* tuple */[
    Char.escaped,
    "Char.escaped"
  ],
  /* [] */0
];

var f28 = /* tuple */[
  "char -> string",
  f28_001
];

var f29_001 = /* :: */[
  /* tuple */[
    Char.lowercase,
    "Char.lowercase"
  ],
  /* :: */[
    /* tuple */[
      Char.uppercase,
      "Char.uppercase"
    ],
    /* [] */0
  ]
];

var f29 = /* tuple */[
  "char -> char",
  f29_001
];

var f30_001 = /* :: */[
  /* tuple */[
    Caml_string.get,
    "String.get"
  ],
  /* [] */0
];

var f30 = /* tuple */[
  "string -> int -> char",
  f30_001
];

var f31_001 = /* :: */[
  /* tuple */[
    $$String.make,
    "String.make"
  ],
  /* [] */0
];

var f31 = /* tuple */[
  "int -> char -> string",
  f31_001
];

var f32_001 = /* :: */[
  /* tuple */[
    $$String.init,
    "String.init"
  ],
  /* [] */0
];

var f32 = /* tuple */[
  "int -> (int -> char) -> string",
  f32_001
];

var f33_001 = /* :: */[
  /* tuple */[
    $$String.sub,
    "String.sub"
  ],
  /* [] */0
];

var f33 = /* tuple */[
  "string -> int -> int -> string",
  f33_001
];

var f34_001 = /* :: */[
  /* tuple */[
    $$String.mapi,
    "String.mapi"
  ],
  /* [] */0
];

var f34 = /* tuple */[
  "(int -> char -> char) -> string -> string",
  f34_001
];

var f35_001 = /* :: */[
  /* tuple */[
    $$String.map,
    "String.map"
  ],
  /* [] */0
];

var f35 = /* tuple */[
  "(char -> char) -> string -> string",
  f35_001
];

var f36_001 = /* :: */[
  /* tuple */[
    $$String.trim,
    "String.trim"
  ],
  /* :: */[
    /* tuple */[
      $$String.escaped,
      "String.escaped"
    ],
    /* :: */[
      /* tuple */[
        $$String.uppercase,
        "String.uppercase"
      ],
      /* :: */[
        /* tuple */[
          $$String.lowercase,
          "String.lowercase"
        ],
        /* :: */[
          /* tuple */[
            $$String.capitalize,
            "String.capitalize"
          ],
          /* :: */[
            /* tuple */[
              $$String.uncapitalize,
              "String.uncapitalize"
            ],
            /* [] */0
          ]
        ]
      ]
    ]
  ]
];

var f36 = /* tuple */[
  "string -> string",
  f36_001
];

var f37_001 = /* :: */[
  /* tuple */[
    $$String.index,
    "String.index"
  ],
  /* :: */[
    /* tuple */[
      $$String.rindex,
      "String.rindex"
    ],
    /* [] */0
  ]
];

var f37 = /* tuple */[
  "string -> char -> int",
  f37_001
];

var f38_001 = /* :: */[
  /* tuple */[
    $$String.index_from,
    "String.index_from"
  ],
  /* :: */[
    /* tuple */[
      $$String.rindex_from,
      "String.rindex_from"
    ],
    /* [] */0
  ]
];

var f38 = /* tuple */[
  "string -> int -> char -> int",
  f38_001
];

var f39_001 = /* :: */[
  /* tuple */[
    $$String.contains,
    "String.contains"
  ],
  /* [] */0
];

var f39 = /* tuple */[
  "string -> char -> bool",
  f39_001
];

var f40_001 = /* :: */[
  /* tuple */[
    $$String.contains_from,
    "String.contains_from"
  ],
  /* :: */[
    /* tuple */[
      $$String.rcontains_from,
      "String.rcontains_from"
    ],
    /* [] */0
  ]
];

var f40 = /* tuple */[
  "string -> int -> char -> bool",
  f40_001
];

var f41_001 = /* :: */[
  /* tuple */[
    List.length,
    "List.length"
  ],
  /* [] */0
];

var f41 = /* tuple */[
  "'a list -> int",
  f41_001
];

var f42_001 = /* :: */[
  /* tuple */[
    List.hd,
    "List.hd"
  ],
  /* [] */0
];

var f42 = /* tuple */[
  "'a list -> 'a",
  f42_001
];

var f43_001 = /* :: */[
  /* tuple */[
    List.tl,
    "List.tl"
  ],
  /* :: */[
    /* tuple */[
      List.rev,
      "List.rev"
    ],
    /* [] */0
  ]
];

var f43 = /* tuple */[
  "'a list -> 'a list",
  f43_001
];

var f44_001 = /* :: */[
  /* tuple */[
    List.nth,
    "List.nth"
  ],
  /* [] */0
];

var f44 = /* tuple */[
  "'a list -> int -> 'a",
  f44_001
];

var f45_001 = /* :: */[
  /* tuple */[
    List.concat,
    "List.concat"
  ],
  /* :: */[
    /* tuple */[
      List.flatten,
      "List.flatten"
    ],
    /* [] */0
  ]
];

var f45 = /* tuple */[
  "'a list list -> 'a list",
  f45_001
];

var f46_001 = /* :: */[
  /* tuple */[
    List.map,
    "List.map"
  ],
  /* :: */[
    /* tuple */[
      List.rev_map,
      "List.rev_map"
    ],
    /* [] */0
  ]
];

var f46 = /* tuple */[
  "('a -> 'b) -> 'a list -> 'b list",
  f46_001
];

var f47_001 = /* :: */[
  /* tuple */[
    List.mapi,
    "List.mapi"
  ],
  /* [] */0
];

var f47 = /* tuple */[
  "(int -> 'a -> 'b) -> 'a list -> 'b list",
  f47_001
];

var f48_001 = /* :: */[
  /* tuple */[
    List.fold_left,
    "List.fold_left"
  ],
  /* [] */0
];

var f48 = /* tuple */[
  "('a -> 'b -> 'a) -> 'a -> 'b list -> 'a",
  f48_001
];

var f49_001 = /* :: */[
  /* tuple */[
    List.fold_right,
    "List.fold_right"
  ],
  /* [] */0
];

var f49 = /* tuple */[
  "('a -> 'b -> 'b) -> 'a list -> 'b -> 'b",
  f49_001
];

var f50_001 = /* :: */[
  /* tuple */[
    List.map2,
    "List.map2"
  ],
  /* :: */[
    /* tuple */[
      List.rev_map2,
      "List.rev_map2"
    ],
    /* [] */0
  ]
];

var f50 = /* tuple */[
  "('a -> 'b -> 'c) -> 'a list -> 'b list -> 'c list",
  f50_001
];

var f51_001 = /* :: */[
  /* tuple */[
    List.fold_left2,
    "List.fold_left2"
  ],
  /* [] */0
];

var f51 = /* tuple */[
  "('a -> 'b -> 'c -> 'a) -> 'a -> 'b list -> 'c list -> 'a",
  f51_001
];

var f52_001 = /* :: */[
  /* tuple */[
    List.fold_right2,
    "List.fold_right2"
  ],
  /* [] */0
];

var f52 = /* tuple */[
  "('a -> 'b -> 'c -> 'c) -> 'a list -> 'b list -> 'c -> 'c",
  f52_001
];

var f53_001 = /* :: */[
  /* tuple */[
    List.exists,
    "List.exists"
  ],
  /* [] */0
];

var f53 = /* tuple */[
  "('a -> bool) -> 'a list -> bool",
  f53_001
];

var f54_001 = /* :: */[
  /* tuple */[
    List.exists2,
    "List.exists2"
  ],
  /* [] */0
];

var f54 = /* tuple */[
  "('a -> 'b -> bool) -> 'a list -> 'b list -> bool",
  f54_001
];

var f55_001 = /* :: */[
  /* tuple */[
    List.mem,
    "List.mem"
  ],
  /* :: */[
    /* tuple */[
      List.memq,
      "List.memq"
    ],
    /* [] */0
  ]
];

var f55 = /* tuple */[
  "'a -> 'a list -> bool",
  f55_001
];

var f56_001 = /* :: */[
  /* tuple */[
    List.find,
    "List.find"
  ],
  /* [] */0
];

var f56 = /* tuple */[
  "('a -> bool) -> 'a list -> 'a",
  f56_001
];

var f57_001 = /* :: */[
  /* tuple */[
    List.filter,
    "List.filter"
  ],
  /* :: */[
    /* tuple */[
      List.find_all,
      "List.find_all"
    ],
    /* [] */0
  ]
];

var f57 = /* tuple */[
  "('a -> bool) -> 'a list -> 'a list",
  f57_001
];

var f58_001 = /* :: */[
  /* tuple */[
    List.sort,
    "List.sort"
  ],
  /* :: */[
    /* tuple */[
      List.stable_sort,
      "List.stable_sort"
    ],
    /* :: */[
      /* tuple */[
        List.fast_sort,
        "List.fast_sort"
      ],
      /* :: */[
        /* tuple */[
          List.sort_uniq,
          "List.sort_uniq"
        ],
        /* [] */0
      ]
    ]
  ]
];

var f58 = /* tuple */[
  "('a -> 'a -> int) -> 'a list -> 'a list",
  f58_001
];

var f59_001 = /* :: */[
  /* tuple */[
    List.merge,
    "List.merge"
  ],
  /* [] */0
];

var f59 = /* tuple */[
  "('a -> 'a -> int) -> 'a list -> 'a list -> 'a list",
  f59_001
];

var f60_001 = /* :: */[
  /* tuple */[
    (function (prim) {
        return prim.length;
      }),
    "Array.length"
  ],
  /* [] */0
];

var f60 = /* tuple */[
  "'a array -> int",
  f60_001
];

var f61_001 = /* :: */[
  /* tuple */[
    Caml_array.caml_array_get,
    "Array.get"
  ],
  /* [] */0
];

var f61 = /* tuple */[
  "'a array -> int -> 'a",
  f61_001
];

var f62_001 = /* :: */[
  /* tuple */[
    Caml_array.caml_make_vect,
    "Array.make"
  ],
  /* [] */0
];

var f62 = /* tuple */[
  "int -> 'a -> 'a array",
  f62_001
];

var f63_001 = /* :: */[
  /* tuple */[
    $$Array.init,
    "Array.init"
  ],
  /* [] */0
];

var f63 = /* tuple */[
  "int -> (int -> 'a) -> 'a array",
  f63_001
];

var f64_001 = /* :: */[
  /* tuple */[
    $$Array.make_matrix,
    "Array.make_matrix"
  ],
  /* [] */0
];

var f64 = /* tuple */[
  "int -> int -> 'a -> 'a array array",
  f64_001
];

var f65_001 = /* :: */[
  /* tuple */[
    $$Array.append,
    "Array.append"
  ],
  /* [] */0
];

var f65 = /* tuple */[
  "'a array -> 'a array -> 'a array",
  f65_001
];

var f66_001 = /* :: */[
  /* tuple */[
    $$Array.concat,
    "Array.concat"
  ],
  /* [] */0
];

var f66 = /* tuple */[
  "'a array list -> 'a array",
  f66_001
];

var f67_001 = /* :: */[
  /* tuple */[
    $$Array.sub,
    "Array.sub"
  ],
  /* [] */0
];

var f67 = /* tuple */[
  "'a array -> int -> int -> 'a array",
  f67_001
];

var f68_001 = /* :: */[
  /* tuple */[
    $$Array.copy,
    "Array.copy"
  ],
  /* [] */0
];

var f68 = /* tuple */[
  "'a array -> 'a array",
  f68_001
];

var f69_001 = /* :: */[
  /* tuple */[
    $$Array.to_list,
    "Array.to_list"
  ],
  /* [] */0
];

var f69 = /* tuple */[
  "'a array -> 'a list",
  f69_001
];

var f70_001 = /* :: */[
  /* tuple */[
    $$Array.of_list,
    "Array.of_list"
  ],
  /* [] */0
];

var f70 = /* tuple */[
  "'a list -> 'a array",
  f70_001
];

var f71_001 = /* :: */[
  /* tuple */[
    $$Array.map,
    "Array.map"
  ],
  /* [] */0
];

var f71 = /* tuple */[
  "('a -> 'b) -> 'a array -> 'b array",
  f71_001
];

var f72_001 = /* :: */[
  /* tuple */[
    $$Array.mapi,
    "Array.mapi"
  ],
  /* [] */0
];

var f72 = /* tuple */[
  "(int -> 'a -> 'b) -> 'a array -> 'b array",
  f72_001
];

var f73_001 = /* :: */[
  /* tuple */[
    $$Array.fold_left,
    "Array.fold_left"
  ],
  /* [] */0
];

var f73 = /* tuple */[
  "('a -> 'b -> 'a) -> 'a -> 'b array -> 'a",
  f73_001
];

var f74_001 = /* :: */[
  /* tuple */[
    $$Array.fold_right,
    "Array.fold_right"
  ],
  /* [] */0
];

var f74 = /* tuple */[
  "('a -> 'b -> 'b) -> 'a array -> 'b -> 'b",
  f74_001
];

var f75_001 = /* :: */[
  /* tuple */[
    Caml_array.caml_make_float_vect,
    "Array.make_float"
  ],
  /* [] */0
];

var f75 = /* tuple */[
  "int -> float array",
  f75_001
];

exports.f0 = f0;
exports.f1 = f1;
exports.f2 = f2;
exports.f3 = f3;
exports.f4 = f4;
exports.f5 = f5;
exports.f6 = f6;
exports.f7 = f7;
exports.f8 = f8;
exports.f9 = f9;
exports.f10 = f10;
exports.f11 = f11;
exports.f12 = f12;
exports.f13 = f13;
exports.f14 = f14;
exports.f15 = f15;
exports.f16 = f16;
exports.f17 = f17;
exports.f18 = f18;
exports.f19 = f19;
exports.f20 = f20;
exports.f21 = f21;
exports.f22 = f22;
exports.f23 = f23;
exports.f24 = f24;
exports.f25 = f25;
exports.f26 = f26;
exports.f27 = f27;
exports.f28 = f28;
exports.f29 = f29;
exports.f30 = f30;
exports.f31 = f31;
exports.f32 = f32;
exports.f33 = f33;
exports.f34 = f34;
exports.f35 = f35;
exports.f36 = f36;
exports.f37 = f37;
exports.f38 = f38;
exports.f39 = f39;
exports.f40 = f40;
exports.f41 = f41;
exports.f42 = f42;
exports.f43 = f43;
exports.f44 = f44;
exports.f45 = f45;
exports.f46 = f46;
exports.f47 = f47;
exports.f48 = f48;
exports.f49 = f49;
exports.f50 = f50;
exports.f51 = f51;
exports.f52 = f52;
exports.f53 = f53;
exports.f54 = f54;
exports.f55 = f55;
exports.f56 = f56;
exports.f57 = f57;
exports.f58 = f58;
exports.f59 = f59;
exports.f60 = f60;
exports.f61 = f61;
exports.f62 = f62;
exports.f63 = f63;
exports.f64 = f64;
exports.f65 = f65;
exports.f66 = f66;
exports.f67 = f67;
exports.f68 = f68;
exports.f69 = f69;
exports.f70 = f70;
exports.f71 = f71;
exports.f72 = f72;
exports.f73 = f73;
exports.f74 = f74;
exports.f75 = f75;
/* No side effect */