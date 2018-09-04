module.exports = () => {
    const assert = require('assert');
    const Map = require('../../model/map.model.js');
    const md5 = require('md5-file').sync;
    const fs = require('fs');
    const ModelTestUtils = require('./model-test-utils.js');
    const subModelTest = require('./model-test-template.js');

    const baseFilePath = './test/blank.sav';
    const testFilePath = './test/map.test.sav';

    const expectedFile = './test/map.model.spec.sav';

    const expectedJson = {
        "towers": {
            "all": { "unearthed": true },
            "akkala": { "active": false, "found": false },
            "central": { "active": true, "found": true },
            "duelingpeaks": { "active": false, "found": true },
            "eldin": { "active": true, "found": true },
            "faron": { "active": true, "found": true },
            "gerudo": { "active": true, "found": true },
            "greatplateau": { "active": true, "found": true },
            "hateno": { "active": true, "found": true },
            "hebra": { "active": true, "found": true },
            "lake": { "active": true, "found": true },
            "lanayru": { "active": true, "found": true },
            "ridgeland": { "active": false, "found": false },
            "tabantha": { "active": false, "found": false },
            "wasteland": { "active": false, "found": false },
            "woodland": { "active": false, "found": false }
        },
        "divinebeasts": {
            "vahmedoh": {
                "active": true,
                "complete": true,
                "found": true,
                "map": true,
                "terminalsremaining": 0,
                "terminal1": true,
                "terminal2": true,
                "terminal3": true,
                "terminal4": true,
                "terminal5": true,
                "heartcontaineravailable": true,
                "heartcontainertaken": true
            },
            "vahrudania": {
                "active": true,
                "complete": false,
                "found": true,
                "map": true,
                "terminalsremaining": 1,
                "terminal1": false,
                "terminal2": true,
                "terminal3": true,
                "terminal4": true,
                "terminal5": true,
                "heartcontaineravailable": false,
                "heartcontainertaken": false
            },
            "vahruta": {
                "active": true,
                "complete": false,
                "found": true,
                "map": true,
                "terminalsremaining": 2,
                "terminal1": true,
                "terminal2": false,
                "terminal3": false,
                "terminal4": true,
                "terminal5": true,
                "heartcontaineravailable": false,
                "heartcontainertaken": false
            },
            "vahnaboris": {
                "active": true,
                "complete": false,
                "found": true,
                "map": true,
                "terminalsremaining": 3,
                "terminal1": false,
                "terminal2": true,
                "terminal3": true,
                "terminal4": false,
                "terminal5": false,
                "heartcontaineravailable": false,
                "heartcontainertaken": false
            },
            "finaltrial": {
                "complete": false,
                "map": false,
                "terminalsremaining": 4,
                "terminal1": false,
                "terminal2": false,
                "terminal3": false,
                "terminal4": false
            }
        },
        "ancienttechlabs": {
            "akkala": { "active": false, "found": false },
            "hateno": { "active": false, "found": false }
        },
        "shrines": {
            "resurrection": { "active" : true, "pedestal": true },
            "akhvaquot": { "active": true, "complete": false, "found": true, "pedestal": true },
            "bareedanaag": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true },
            "boshkala": { "active": true, "complete": false, "found": true, "pedestal": true },
            "chaasqeta": { "active": true, "complete": false, "found": true, "pedestal": true },
            "daagchokah": { "active": true, "complete": false, "found": true, "pedestal": true },
            "dagahkeek": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true },
            "dahhesho": { "active": true, "complete": false, "found": true, "pedestal": true },
            "dahkaso": { "active": true, "complete": false, "found": true, "pedestal": true },
            "dakatuss": { "active": true, "complete": false, "found": true, "pedestal": true },
            "dakotah": { "active": true, "complete": false, "found": true, "pedestal": true },
            "daqakoh": { "active": true, "complete": false, "found": true, "pedestal": true },
            "daqochisay": { "active": true, "complete": false, "found": true, "pedestal": true },
            "dilamaag": { "active": true, "complete": false, "found": true, "pedestal": true },
            "downaeh": { "active": true, "complete": false, "found": true, "pedestal": true },
            "dunbataag": { "active": true, "complete": false, "found": true, "pedestal": true },
            "geeharah": { "active": true, "complete": false, "found": true, "pedestal": true },
            "gomaasaagh": { "active": true, "complete": false, "found": true, "pedestal": true },
            "goraetorr": { "active": true, "complete": false, "found": true, "pedestal": true },
            "hadahamar": { "active": true, "complete": false, "found": true, "pedestal": true },
            "hawakoth": { "active": true, "complete": false, "found": true, "pedestal": true },
            "hiamiu": { "active": true, "complete": false, "found": true, "pedestal": true },
            "hilarao": { "active": true, "complete": false, "found": true, "pedestal": true },
            "ishtosoh": { "active": true, "complete": false, "found": true, "pedestal": true },
            "jabaij": { "active": true, "complete": true, "found": true, "pedestal": true },
            "jeenoh": { "active": true, "complete": true, "found": true, "pedestal": true },
            "jitansami": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true },
            "joloonah": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true },
            "kaamyatak": { "active": true, "complete": false, "found": true, "pedestal": true },
            "kahmael": { "active": true, "complete": false, "found": true, "pedestal": true },
            "kahokeo": { "active": true, "complete": false, "found": true, "pedestal": true },
            "kahyah": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true },
            "kamurog": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true },
            "kaomakagh": { "active": true, "complete": false, "found": true, "pedestal": true },
            "katahchuki": { "active": true, "complete": false, "found": true, "pedestal": true },
            "katosaaug": { "active": true, "complete": false, "found": true, "pedestal": true },
            "kayawan": { "active": true, "complete": false, "found": true, "pedestal": true },
            "kaynoh": { "active": true, "complete": false, "found": true, "pedestal": true },
            "kayramah": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true },
            "keehayoog": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true },
            "kehnamut": { "active": true, "complete": true, "found": true, "pedestal": true },
            "kemakosassa": { "active": true, "complete": false, "found": true, "pedestal": true },
            "kemazoos": { "active": true, "complete": false, "found": true, "pedestal": true },
            "kenaishakah": { "active": true, "complete": false, "found": true, "pedestal": true },
            "keoruug": { "active": true, "complete": false, "found": true, "pedestal": true },
            "ketohwawai": { "active": true, "complete": false, "found": true, "pedestal": true },
            "korguchideh": { "active": true, "complete": false, "found": true, "pedestal": true },
            "korshohu": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true },
            "kuhnsidajj": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true },
            "kuhtakkar": { "active": true, "complete": false, "found": true, "pedestal": true },
            "laknarokee": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true },
            "lannokooh": { "active": true, "complete": false, "found": true, "pedestal": true },
            "maaghalan": { "active": true, "complete": false, "found": true, "pedestal": true },
            "maagnorah": { "active": true, "complete": false, "found": true, "pedestal": true },
            "makarah": { "active": true, "complete": false, "found": true, "pedestal": true },
            "mezzalo": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true },
            "mijahrokee": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true },
            "mirroshaz": { "active": true, "complete": false, "found": true, "pedestal": true },
            "misaesuma": { "active": true, "complete": false, "found": true, "pedestal": true },
            "moakeet": { "active": true, "complete": false, "found": true, "pedestal": true },
            "mogglatan": { "active": true, "complete": false, "found": true, "pedestal": true },
            "monyatoma": { "active": true, "complete": false, "found": true, "pedestal": true },
            "mozoshenno": { "active": true, "complete": false, "found": true, "pedestal": true },
            "muwojeem": { "active": true, "complete": false, "found": true, "pedestal": true },
            "myahmagana": { "active": true, "complete": false, "found": true, "pedestal": true },
            "namikaozz": { "active": true, "complete": false, "found": true, "pedestal": true },
            "neezyohma": { "active": true, "complete": false, "found": true, "pedestal": true },
            "noyaneha": { "active": true, "complete": false, "found": true, "pedestal": true },
            "omanau": { "active": true, "complete": true, "found": true, "pedestal": true },
            "owadaim": { "active": true, "complete": true, "found": true, "pedestal": true },
            "pumaagnitae": { "active": true, "complete": false, "found": true, "pedestal": true },
            "qazatokki": { "active": true, "complete": false, "found": true, "pedestal": true },
            "quaraym": { "active": true, "complete": false, "found": true, "pedestal": true },
            "qukahnata": { "active": true, "complete": false, "found": true, "pedestal": true },
            "raqazunzo": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true },
            "reedahee": { "active": true, "complete": false, "found": true, "pedestal": true },
            "rinoyaa": { "active": true, "complete": false, "found": true, "pedestal": true },
            "ritaagzumo": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true },
            "rokuwog": { "active": true, "complete": false, "found": true, "pedestal": true },
            "ronakachta": { "active": true, "complete": false, "found": true, "pedestal": true },
            "rotaooh": { "active": true, "complete": false, "found": true, "pedestal": true },
            "ruccomaag": { "active": true, "complete": false, "found": true, "pedestal": true },
            "saaskosah": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true },
            "sahdahaj": { "active": true, "complete": false, "found": true, "pedestal": true },
            "sasakai": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true },
            "shadanaw": { "active": true, "complete": false, "found": true, "pedestal": true },
            "shaekatha": { "active": true, "complete": false, "found": true, "pedestal": true },
            "shaeloya": { "active": true, "complete": false, "found": true, "pedestal": true },
            "shaemosah": { "active": true, "complete": false, "found": true, "pedestal": true },
            "shagehma": { "active": true, "complete": false, "found": true, "pedestal": true },
            "shaiutoh": { "active": true, "complete": false, "found": true, "pedestal": true },
            "shaiyota": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true },
            "shawarvo": { "active": true, "complete": false, "found": true, "pedestal": true },
            "sheemdagoze": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true },
            "sheevaneer": { "active": true, "complete": false, "found": true, "pedestal": true },
            "sheevenath": { "active": true, "complete": false, "found": true, "pedestal": true },
            "shehrata": { "active": true, "complete": false, "found": true, "pedestal": true },
            "shodantu": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true },
            "shodasah": { "active": true, "complete": false, "found": true, "pedestal": true },
            "shoqatatone": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true },
            "shorahah": { "active": true, "complete": false, "found": true, "pedestal": true },
            "sohkofi": { "active": true, "complete": false, "found": true, "pedestal": true },
            "sumasahma": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true },
            "tahmuhl": { "active": true, "complete": false, "found": true, "pedestal": true },
            "tahnooah": { "active": true, "complete": false, "found": true, "pedestal": true },
            "talohnaeg": { "active": true, "complete": false, "found": true, "pedestal": true },
            "tawajinn": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true },
            "tenakosah": { "active": true, "complete": false, "found": true, "pedestal": true },
            "thokayu": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true },
            "tohyahsa": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true },
            "toquomo": { "active": true, "complete": false, "found": true, "pedestal": true },
            "totosah": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true },
            "tukaloh": { "active": true, "complete": false, "found": true, "pedestal": true },
            "tutsuwanima": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true },
            "voolota": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true },
            "wahgokatta": { "active": true, "complete": false, "found": true, "pedestal": true },
            "yahrin": { "active": true, "complete": false, "found": true, "pedestal": true },
            "yanaga": { "active": true, "complete": false, "found": true, "pedestal": true },
            "zaltawa": { "active": true, "complete": false, "found": true, "pedestal": true },
            "zekasho": { "active": true, "complete": false, "found": true, "pedestal": true },
            "zunakai": { "active": true, "complete": false, "found": true, "pedestal": true },
            "etsukorima": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true, "monsterbaseconquered": true, "ischampionsballad": true },
            "kamiaomuna": { "active": true, "complete": true, "found": true, "pedestal": true, "unearthed": true, "ischampionsballad": true },
            "keedafunia": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true, "ischampionsballad": true },
            "keivetala": { "active": true, "complete": true, "found": true, "pedestal": true, "unearthed": true, "ischampionsballad": true },
            "kiahtoza": { "active": true, "complete": true, "found": true, "pedestal": true, "unearthed": true, "ischampionsballad": true },
            "kihiromoh": { "active": true, "complete": true, "found": true, "pedestal": true, "unearthed": true, "ischampionsballad": true },
            "maheliya": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true, "ischampionsballad": true },
            "noerajee": { "active": true, "complete": true, "found": true, "pedestal": true, "unearthed": true, "ischampionsballad": true },
            "rinuhonika": { "active": true, "complete": true, "found": true, "pedestal": true, "unearthed": true, "ischampionsballad": true },
            "rohtachigah": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true, "monsterbaseconquered": true, "ischampionsballad": true },
            "ruvokorbah": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true, "monsterbaseconquered": true, "ischampionsballad": true },
            "satokoda": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true, "ischampionsballad": true },
            "sharolun": { "active": true, "complete": true, "found": true, "pedestal": true, "unearthed": true, "ischampionsballad": true },
            "shiragomar": { "active": true, "complete": true, "found": true, "pedestal": true, "unearthed": true, "ischampionsballad": true },
            "takamashiri": { "active": true, "complete": true, "found": true, "pedestal": true, "unearthed": true, "ischampionsballad": true },
            "yowakaita": { "active": true, "complete": false, "found": true, "pedestal": true, "unearthed": true, "monsterbaseconquered": true, "ischampionsballad": true }
        }
    };

    return new Promise((resolve, reject) => {
        describe('map.model.js', function() {
            after(function() {
                if (fs.existsSync(testFilePath)) {
                    fs.unlinkSync(testFilePath);
                }
                resolve();
            });

            it('should write the map to the save file correctly', function() {
                fs.copyFileSync(baseFilePath, testFilePath);

                return Map.write(expectedJson, testFilePath);
            }).timeout(10000);

            it('should read the map from the save file correctly', function() {
                const actualJson = Map.read(testFilePath);

                ModelTestUtils.doKeysMatch(expectedJson, actualJson, 'map');
            });

            subModelTest('towers', expectedJson.towers)
                .then(subModelTest('ancienttechlabs', expectedJson.ancienttechlabs))
                .then(subModelTest('shrines', expectedJson.shrines))
                .then(subModelTest('vahmedoh', expectedJson.divinebeasts.vahmedoh))
                .then(subModelTest('vahnaboris', expectedJson.divinebeasts.vahnaboris))
                .then(subModelTest('vahrudania', expectedJson.divinebeasts.vahrudania))
                .then(subModelTest('vahruta', expectedJson.divinebeasts.vahruta))
                .then(subModelTest('finaltrial', expectedJson.divinebeasts.finaltrial))
                .then(resolve);
        });
    });    
};
