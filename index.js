// Set DEBUG environment variable to true to enable logging messages
const debug = (
  ('string' == typeof process.env.DEBUG)
    && ('true' == process.env.DEBUG)
) ? true : false;

/**
 *
 * @Description Take a street address and return a unique set of variants or false
 * @Function    getVariants
 * @Param       value 				A string, which should be a street address
 * @Returns     {set}         An actual Javascript set
 *
 */
exports.getVariants = function (value) {

  // Validate
  if ('string' != typeof value) {
    return false;
  }
  if (debug) console.log(`Incoming address: ${value}`);

  const arr = exchange(value);
  if (debug) console.log(`Variant array: ${arr}`);

  // Return
  return new Set (arr);

}

/**
 *
 * @Description Does the work
 * @Function    exchange  Exchanges matches in value string w/replacements
 * @Param       value 	  A string, which should be a street address
 * @Returns     array     Array of variants
 *
 */
function exchange (value) {

  if (!value || !value.length) return [];
  value = value.toLowerCase();

  const retVal = [];
  let variants = [];
  const words = value.split(' ');
  if (debug) console.log(`Words: ${JSON.stringify(words, null, 2)}`);

  words.forEach((word, index) => {
    const k = matches.indexOf(word);
    let exp;
    if (debug) console.log(`Words[${k}]: ${word}`);
    if (-1 != k) {
      if (debug) console.log(`Matches[${k}]: ${matches[k]}`);
      if (debug) console.log(`Replacement[${k}]: ${replacements[k]}`);
      if (words.length == k + 1) {
        exp = new RegExp(`${word}$`, 'i');
      } else {
        exp = new RegExp(`${word}`, 'i');
      }
      v = value.replace(exp, replacements[k]);
      if (v != value) {
        if (debug) console.log(`Pushing: ${v}`);
        variants.push(v);
        if (debug) console.log(`Recursing on: ${v}`);
        variants = variants.concat(exchange(v));
      }
    }
  });


  // Strip empties
  variants.forEach(value => value && retVal.push(value));

  return retVal;

}


var matches = new Array('north',
    'northeast',
    'south',
    'east',
    'southeast',
    'west',
    'southwest',
    'alberta',
    'british columbia',
    'manitoba',
    'new brunswick',
    'newfoundland and labrador',
    'northwest territories',
    'nova scotia',
    'nunavut',
    'ontario',
    'prince edward island',
    'quebec',
    'saskatchewan',
    'yukon',
    'allee',
    'alley',
    'ally',
    'aly',
    'anex',
    'annex',
    'annx',
    'anx',
    'arc',
    'arcade',
    'av',
    'ave',
    'aven',
    'avenu',
    'avenue',
    'avn',
    'avnue',
    'bayoo',
    'bayou',
    'bch',
    'beach',
    'bend',
    'bnd',
    'blf',
    'bluf',
    'bluff',
    'bluffs',
    'bot',
    'btm',
    'bottm',
    'bottom',
    'blvd',
    'boul',
    'boulevard',
    'boulv',
    'br',
    'brnch',
    'branch',
    'brdge',
    'brg',
    'bridge',
    'brk',
    'brook',
    'brooks',
    'burg',
    'burgs',
    'byp',
    'bypa',
    'bypas',
    'bypass',
    'byps',
    'camp',
    'cp',
    'cmp',
    'canyn',
    'canyon',
    'cnyn',
    'cape',
    'cpe',
    'causeway',
    'causwa',
    'cswy',
    'cen',
    'cent',
    'center',
    'centr',
    'centre',
    'cnter',
    'cntr',
    'ctr',
    'centers',
    'cir',
    'circ',
    'circl',
    'circle',
    'crcl',
    'crcle',
    'circles',
    'clf',
    'cliff',
    'clfs',
    'cliffs',
    'clb',
    'club',
    'common',
    'commons',
    'cor',
    'corner',
    'corners',
    'cors',
    'course',
    'crse',
    'court',
    'ct',
    'courts',
    'cts',
    'cove',
    'cv',
    'coves',
    'creek',
    'crk',
    'crescent',
    'cres',
    'crsent',
    'crsnt',
    'crest',
    'crossing',
    'crssng',
    'xing',
    'crossroad',
    'crossroads',
    'curve',
    'dale',
    'dl',
    'dam',
    'dm',
    'div',
    'divide',
    'dv',
    'dvd',
    'dr',
    'driv',
    'drive',
    'drv',
    'drives',
    'est',
    'estate',
    'estates',
    'ests',
    'exp',
    'expr',
    'express',
    'expressway',
    'expw',
    'expy',
    'ext',
    'extension',
    'extn',
    'extnsn',
    'exts',
    'fall',
    'falls',
    'fls',
    'ferry',
    'frry',
    'fry',
    'field',
    'fld',
    'fields',
    'flds',
    'flat',
    'flt',
    'flats',
    'flts',
    'ford',
    'frd',
    'fords',
    'forest',
    'forests',
    'frst',
    'forg',
    'forge',
    'frg',
    'forges',
    'fork',
    'frk',
    'forks',
    'frks',
    'fort',
    'frt',
    'ft',
    'freeway',
    'freewy',
    'frway',
    'frwy',
    'fwy',
    'garden',
    'gardn',
    'grden',
    'grdn',
    'gardens',
    'gdns',
    'grdns',
    'gateway',
    'gatewy',
    'gatway',
    'gtway',
    'gtwy',
    'glen',
    'gln',
    'glens',
    'green',
    'grn',
    'greens',
    'grov',
    'grove',
    'grv',
    'groves',
    'harb',
    'harbor',
    'harbr',
    'hbr',
    'hrbor',
    'harbors',
    'haven',
    'hvn',
    'ht',
    'hts',
    'highway',
    'highwy',
    'hiway',
    'hiwy',
    'hway',
    'hwy',
    'hill',
    'hl',
    'hills',
    'hls',
    'hllw',
    'hollow',
    'hollows',
    'holw',
    'holws',
    'nlt',
    's',
    'sland',
    'slnd',
    'slands',
    'slnds',
    'ss',
    'sle',
    'sles',
    'jct',
    'jction',
    'jctn',
    'junction',
    'junctn',
    'juncton',
    'jctns',
    'jcts',
    'junctions',
    'key',
    'ky',
    'keys',
    'kys',
    'knl',
    'knol',
    'knoll',
    'knls',
    'knolls',
    'lk',
    'lake',
    'lks',
    'lakes',
    'land',
    'landing',
    'lndg',
    'lndng',
    'lane',
    'ln',
    'lgt',
    'light',
    'lights',
    'lf',
    'loaf',
    'lck',
    'lock',
    'lcks',
    'locks',
    'ldg',
    'ldge',
    'lodg',
    'lodge',
    'loop',
    'loops',
    'mall',
    'mnr',
    'manor',
    'manors',
    'mnrs',
    'meadow',
    'mdw',
    'mdws',
    'meadows',
    'medows',
    'mews',
    'mill',
    'mills',
    'missn',
    'mssn',
    'motorway',
    'mnt',
    'mt',
    'mount',
    'mntain',
    'mntn',
    'mountain',
    'mountin',
    'mtin',
    'mtn',
    'mntns',
    'mountains',
    'nck',
    'neck',
    'orch',
    'orchard',
    'orchrd',
    'oval',
    'ovl',
    'overpass',
    'park',
    'prk',
    'parks',
    'parkway',
    'parkwy',
    'pkway',
    'pkwy',
    'pky',
    'parkways',
    'pkwys',
    'pass',
    'passage',
    'path',
    'paths',
    'pike',
    'pikes',
    'pine',
    'pines',
    'pnes',
    'pl',
    'plain',
    'pln',
    'plains',
    'plns',
    'plaza',
    'plz',
    'plza',
    'point',
    'pt',
    'points',
    'pts',
    'port',
    'prt',
    'ports',
    'prts',
    'pr',
    'prairie',
    'prr',
    'rad',
    'radial',
    'radiel',
    'radl',
    'ramp',
    'ranch',
    'ranches',
    'rnch',
    'rnchs',
    'rapid',
    'rpd',
    'rapids',
    'rpds',
    'rest',
    'rst',
    'rdg',
    'rdge',
    'ridge',
    'rdgs',
    'ridges',
    'riv',
    'river',
    'rvr',
    'rivr',
    'rd',
    'road',
    'roads',
    'rds',
    'route',
    'row',
    'rue',
    'run',
    'shl',
    'shoal',
    'shls',
    'shoals',
    'shoar',
    'shore',
    'shr',
    'shoars',
    'shores',
    'shrs',
    'skyway',
    'spg',
    'spng',
    'spring',
    'sprng',
    'spgs',
    'spngs',
    'springs',
    'sprngs',
    'spur',
    'spurs',
    'sq',
    'sqr',
    'sqre',
    'squ',
    'square',
    'sqrs',
    'squares',
    'sta',
    'station',
    'statn',
    'stn',
    'stra',
    'strav',
    'straven',
    'stravenue',
    'stravn',
    'strvn',
    'strvnue',
    'stream',
    'streme',
    'strm',
    'street',
    'strt',
    'st',
    'str',
    'streets',
    'smt',
    'sumit',
    'sumitt',
    'summit',
    'ter',
    'terr',
    'terrace',
    'throughway',
    'trace',
    'traces',
    'trce',
    'track',
    'tracks',
    'trak',
    'trk',
    'trks',
    'trafficway',
    'trail',
    'trails',
    'trl',
    'trls',
    'trailer',
    'trlr',
    'trlrs',
    'tunel',
    'tunl',
    'tunls',
    'tunnel',
    'tunnels',
    'tunnl',
    'trnpk',
    'turnpike',
    'turnpk',
    'underpass',
    'un',
    'union',
    'unions',
    'valley',
    'vally',
    'vlly',
    'vly',
    'valleys',
    'vlys',
    'vdct',
    'via',
    'viadct',
    'viaduct',
    'view',
    'vw',
    'views',
    'vws',
    'vill',
    'villag',
    'village',
    'villg',
    'villiage',
    'vlg',
    'villages',
    'vlgs',
    'ville',
    'vl',
    'vis',
    'vist',
    'vista',
    'vst',
    'vsta',
    'walk',
    'walks',
    'wall',
    'wy',
    'way',
    'ways',
    'well',
    'wells',
    'wls');
var replacements = new Array('n',
    'ne',
    's',
    'e',
    'se',
    'w',
    'sw',
    'ab',
    'bc',
    'mb',
    'nb',
    'nl',
    'nt',
    'ns',
    'nu',
    'on',
    'pe',
    'qc',
    'sk',
    'yt',
    'aly',
    'aly',
    'aly',
    'aly',
    'anx',
    'anx',
    'anx',
    'anx',
    'arc',
    'arc',
    'ave',
    'ave',
    'ave',
    'ave',
    'ave',
    'ave',
    'ave',
    'byu',
    'byu',
    'bch',
    'bch',
    'bnd',
    'bnd',
    'blf',
    'blf',
    'blf',
    'blfs',
    'btm',
    'btm',
    'btm',
    'btm',
    'blvd',
    'blvd',
    'blvd',
    'blvd',
    'br',
    'br',
    'br',
    'brg',
    'brg',
    'brg',
    'brk',
    'brk',
    'brks',
    'bg',
    'bgs',
    'byp',
    'byp',
    'byp',
    'byp',
    'byp',
    'cp',
    'cp',
    'cp',
    'cyn',
    'cyn',
    'cyn',
    'cpe',
    'cpe',
    'cswy',
    'cswy',
    'cswy',
    'ctr',
    'ctr',
    'ctr',
    'ctr',
    'ctr',
    'ctr',
    'ctr',
    'ctr',
    'ctrs',
    'cir',
    'cir',
    'cir',
    'cir',
    'cir',
    'cir',
    'cirs',
    'clf',
    'clf',
    'clfs',
    'clfs',
    'clb',
    'clb',
    'cmn',
    'cmns',
    'cor',
    'cor',
    'cors',
    'cors',
    'crse',
    'crse',
    'ct',
    'ct',
    'cts',
    'cts',
    'cv',
    'cv',
    'cvs',
    'crk',
    'crk',
    'cres',
    'cres',
    'cres',
    'cres',
    'crst',
    'xing',
    'xing',
    'xing',
    'xrd',
    'xrds',
    'curv',
    'dl',
    'dl',
    'dm',
    'dm',
    'dv',
    'dv',
    'dv',
    'dv',
    'dr',
    'dr',
    'dr',
    'dr',
    'drs',
    'est',
    'est',
    'ests',
    'ests',
    'expy',
    'expy',
    'expy',
    'expy',
    'expy',
    'expy',
    'ext',
    'ext',
    'ext',
    'ext',
    'exts',
    'fall',
    'fls',
    'fls',
    'fry',
    'fry',
    'fry',
    'fld',
    'fld',
    'flds',
    'flds',
    'flt',
    'flt',
    'flts',
    'flts',
    'frd',
    'frd',
    'frds',
    'frst',
    'frst',
    'frst',
    'frg',
    'frg',
    'frg',
    'frgs',
    'frk',
    'frk',
    'frks',
    'frks',
    'ft',
    'ft',
    'ft',
    'fwy',
    'fwy',
    'fwy',
    'fwy',
    'fwy',
    'gdn',
    'gdn',
    'gdn',
    'gdn',
    'gdns',
    'gdns',
    'gdns',
    'gtwy',
    'gtwy',
    'gtwy',
    'gtwy',
    'gtwy',
    'gln',
    'gln',
    'glns',
    'grn',
    'grn',
    'grns',
    'grv',
    'grv',
    'grv',
    'grvs',
    'hbr',
    'hbr',
    'hbr',
    'hbr',
    'hbr',
    'hbrs',
    'hvn',
    'hvn',
    'hts',
    'hts',
    'hwy',
    'hwy',
    'hwy',
    'hwy',
    'hwy',
    'hwy',
    'hl',
    'hl',
    'hls',
    'hls',
    'holw',
    'holw',
    'holw',
    'holw',
    'holw',
    'inlt',
    'is',
    'is',
    'is',
    'iss',
    'iss',
    'iss',
    'isle',
    'isle',
    'jct',
    'jct',
    'jct',
    'jct',
    'jct',
    'jct',
    'jcts',
    'jcts',
    'jcts',
    'ky',
    'ky',
    'kys',
    'kys',
    'knl',
    'knl',
    'knl',
    'knls',
    'knls',
    'lk',
    'lk',
    'lks',
    'lks',
    'land',
    'lndg',
    'lndg',
    'lndg',
    'ln',
    'ln',
    'lgt',
    'lgt',
    'lgts',
    'lf',
    'lf',
    'lck',
    'lck',
    'lcks',
    'lcks',
    'ldg',
    'ldg',
    'ldg',
    'ldg',
    'loop',
    'loop',
    'mall',
    'mnr',
    'mnr',
    'mnrs',
    'mnrs',
    'mdw',
    'mdws',
    'mdws',
    'mdws',
    'mdws',
    'mews',
    'ml',
    'mls',
    'msn',
    'msn',
    'mtwy',
    'mt',
    'mt',
    'mt',
    'mtn',
    'mtn',
    'mtn',
    'mtn',
    'mtn',
    'mtn',
    'mtns',
    'mtns',
    'nck',
    'nck',
    'orch',
    'orch',
    'orch',
    'oval',
    'oval',
    'opas',
    'park',
    'park',
    'park',
    'pkwy',
    'pkwy',
    'pkwy',
    'pkwy',
    'pkwy',
    'pkwy',
    'pkwy',
    'pass',
    'psge',
    'path',
    'path',
    'pike',
    'pike',
    'pne',
    'pnes',
    'pnes',
    'pl',
    'pln',
    'pln',
    'plns',
    'plns',
    'plz',
    'plz',
    'plz',
    'pt',
    'pt',
    'pts',
    'pts',
    'prt',
    'prt',
    'prts',
    'prts',
    'pr',
    'pr',
    'pr',
    'radl',
    'radl',
    'radl',
    'radl',
    'ramp',
    'rnch',
    'rnch',
    'rnch',
    'rnch',
    'rpd',
    'rpd',
    'rpds',
    'rpds',
    'rst',
    'rst',
    'rdg',
    'rdg',
    'rdg',
    'rdgs',
    'rdgs',
    'riv',
    'riv',
    'riv',
    'riv',
    'rd',
    'rd',
    'rds',
    'rds',
    'rte',
    'row',
    'rue',
    'run',
    'shl',
    'shl',
    'shls',
    'shls',
    'shr',
    'shr',
    'shr',
    'shrs',
    'shrs',
    'shrs',
    'skwy',
    'spg',
    'spg',
    'spg',
    'spg',
    'spgs',
    'spgs',
    'spgs',
    'spgs',
    'spur',
    'spur',
    'sq',
    'sq',
    'sq',
    'sq',
    'sq',
    'sqs',
    'sqs',
    'sta',
    'sta',
    'sta',
    'sta',
    'stra',
    'stra',
    'stra',
    'stra',
    'stra',
    'stra',
    'stra',
    'strm',
    'strm',
    'strm',
    'st',
    'st',
    'st',
    'st',
    'sts',
    'smt',
    'smt',
    'smt',
    'smt',
    'ter',
    'ter',
    'ter',
    'trwy',
    'trce',
    'trce',
    'trce',
    'trak',
    'trak',
    'trak',
    'trak',
    'trak',
    'trfy',
    'trl',
    'trl',
    'trl',
    'trl',
    'trlr',
    'trlr',
    'trlr',
    'tunl',
    'tunl',
    'tunl',
    'tunl',
    'tunl',
    'tunl',
    'tpke',
    'tpke',
    'tpke',
    'upas',
    'un',
    'un',
    'uns',
    'vly',
    'vly',
    'vly',
    'vly',
    'vlys',
    'vlys',
    'via',
    'via',
    'via',
    'via',
    'vw',
    'vw',
    'vws',
    'vws',
    'vlg',
    'vlg',
    'vlg',
    'vlg',
    'vlg',
    'vlg',
    'vlgs',
    'vlgs',
    'vl',
    'vl',
    'vis',
    'vis',
    'vis',
    'vis',
    'vis',
    'walk',
    'walk',
    'wall',
    'way',
    'way',
    'ways',
    'wl',
    'wls',
    'wls');
