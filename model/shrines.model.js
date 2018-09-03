module.exports = (() => {
    const Shrine = require('./shrine.model.js');
    const CONFIG = require('../config.js');
    const changeReader = require('../read-changes.js');
    const changeWriter = require('../batch-apply-changes.js');
    const defaultEffectMap = `${CONFIG.exportpath}effectmap.json`;
    const mapFileUtils = require('../map-file-utils.js');

    const getChangeReader = (saveFile, effectMapPath) => {
        return (keys, withLogging) => {
            return changeReader(saveFile)(effectMapPath || defaultEffectMap, keys, withLogging);
        };
    };
    const getChangeWriter = (saveFile, effectMapPath) => {
        return (keys, skipSoftDependencies, withLogging) => {
            return changeWriter(saveFile)(effectMapPath || defaultEffectMap, keys, skipSoftDependencies, withLogging);
        };
    };

    const getKeypathReader = (effectMapPath) => {
        const effectMap = mapFileUtils.getFileAsJsonOrEmptyJsObject(effectMapPath || defaultEffectMap);
        return (keypath) => {
            return mapFileUtils.getValueAtKeyPath(effectMap, keypath);
        };
    };

    return {
        read: (saveFile, effectMapPath) => {
            const keypathReader = getKeypathReader(effectMapPath);
            const changeReader = getChangeReader(saveFile, effectMapPath);

            return {
                // Main Questline Shrines
                resurrection: Shrine.read('resurrection', saveFile, keypathReader, changeReader),
                akhvaquot: Shrine.read('akhvaquot', saveFile, keypathReader, changeReader),
                bareedanaag: Shrine.read('bareedanaag', saveFile, keypathReader, changeReader),
                boshkala: Shrine.read('boshkala', saveFile, keypathReader, changeReader),
                chaasqeta: Shrine.read('chaasqeta', saveFile, keypathReader, changeReader),
                daagchokah: Shrine.read('daagchokah', saveFile, keypathReader, changeReader),
                dagahkeek: Shrine.read('dagahkeek', saveFile, keypathReader, changeReader),
                dahhesho: Shrine.read('dahhesho', saveFile, keypathReader, changeReader),
                dahkaso: Shrine.read('dahkaso', saveFile, keypathReader, changeReader),
                dakatuss: Shrine.read('dakatuss', saveFile, keypathReader, changeReader),
                dakotah: Shrine.read('dakotah', saveFile, keypathReader, changeReader),
                daqakoh: Shrine.read('daqakoh', saveFile, keypathReader, changeReader),
                daqochisay: Shrine.read('daqochisay', saveFile, keypathReader, changeReader),
                dilamaag: Shrine.read('dilamaag', saveFile, keypathReader, changeReader),
                downaeh: Shrine.read('downaeh', saveFile, keypathReader, changeReader),
                dunbataag: Shrine.read('dunbataag', saveFile, keypathReader, changeReader),
                geeharah: Shrine.read('geeharah', saveFile, keypathReader, changeReader),
                gomaasaagh: Shrine.read('gomaasaagh', saveFile, keypathReader, changeReader),
                goraetorr: Shrine.read('goraetorr', saveFile, keypathReader, changeReader),
                hadahamar: Shrine.read('hadahamar', saveFile, keypathReader, changeReader),
                hawakoth: Shrine.read('hawakoth', saveFile, keypathReader, changeReader),
                hiamiu: Shrine.read('hiamiu', saveFile, keypathReader, changeReader),
                hilarao: Shrine.read('hilarao', saveFile, keypathReader, changeReader),
                ishtosoh: Shrine.read('ishtosoh', saveFile, keypathReader, changeReader),
                jabaij: Shrine.read('jabaij', saveFile, keypathReader, changeReader),
                jeenoh: Shrine.read('jeenoh', saveFile, keypathReader, changeReader),
                jitansami: Shrine.read('jitansami', saveFile, keypathReader, changeReader),
                joloonah: Shrine.read('joloonah', saveFile, keypathReader, changeReader),
                kaamyatak: Shrine.read('kaamyatak', saveFile, keypathReader, changeReader),
                kahmael: Shrine.read('kahmael', saveFile, keypathReader, changeReader),
                kahokeo: Shrine.read('kahokeo', saveFile, keypathReader, changeReader),
                kahyah: Shrine.read('kahyah', saveFile, keypathReader, changeReader),
                kamurog: Shrine.read('kamurog', saveFile, keypathReader, changeReader),
                kaomakagh: Shrine.read('kaomakagh', saveFile, keypathReader, changeReader),
                katahchuki: Shrine.read('katahchuki', saveFile, keypathReader, changeReader),
                katosaaug: Shrine.read('katosaaug', saveFile, keypathReader, changeReader),
                kayawan: Shrine.read('kayawan', saveFile, keypathReader, changeReader),
                kaynoh: Shrine.read('kaynoh', saveFile, keypathReader, changeReader),
                kayramah: Shrine.read('kayramah', saveFile, keypathReader, changeReader),
                keehayoog: Shrine.read('keehayoog', saveFile, keypathReader, changeReader),
                kehnamut: Shrine.read('kehnamut', saveFile, keypathReader, changeReader),
                kemakosassa: Shrine.read('kemakosassa', saveFile, keypathReader, changeReader),
                kemazoos: Shrine.read('kemazoos', saveFile, keypathReader, changeReader),
                kenaishakah: Shrine.read('kenaishakah', saveFile, keypathReader, changeReader),
                keoruug: Shrine.read('keoruug', saveFile, keypathReader, changeReader),
                ketohwawai: Shrine.read('ketohwawai', saveFile, keypathReader, changeReader),
                korguchideh: Shrine.read('korguchideh', saveFile, keypathReader, changeReader),
                korshohu: Shrine.read('korshohu', saveFile, keypathReader, changeReader),
                kuhnsidajj: Shrine.read('kuhnsidajj', saveFile, keypathReader, changeReader),
                kuhtakkar: Shrine.read('kuhtakkar', saveFile, keypathReader, changeReader),
                laknarokee: Shrine.read('laknarokee', saveFile, keypathReader, changeReader),
                lannokooh: Shrine.read('lannokooh', saveFile, keypathReader, changeReader),
                maaghalan: Shrine.read('maaghalan', saveFile, keypathReader, changeReader),
                maagnorah: Shrine.read('maagnorah', saveFile, keypathReader, changeReader),
                makarah: Shrine.read('makarah', saveFile, keypathReader, changeReader),
                mezzalo: Shrine.read('mezzalo', saveFile, keypathReader, changeReader),
                mijahrokee: Shrine.read('mijahrokee', saveFile, keypathReader, changeReader),
                mirroshaz: Shrine.read('mirroshaz', saveFile, keypathReader, changeReader),
                misaesuma: Shrine.read('misaesuma', saveFile, keypathReader, changeReader),
                moakeet: Shrine.read('moakeet', saveFile, keypathReader, changeReader),
                mogglatan: Shrine.read('mogglatan', saveFile, keypathReader, changeReader),
                monyatoma: Shrine.read('monyatoma', saveFile, keypathReader, changeReader),
                mozoshenno: Shrine.read('mozoshenno', saveFile, keypathReader, changeReader),
                muwojeem: Shrine.read('muwojeem', saveFile, keypathReader, changeReader),
                myahmagana: Shrine.read('myahmagana', saveFile, keypathReader, changeReader),
                namikaozz: Shrine.read('namikaozz', saveFile, keypathReader, changeReader),
                neezyohma: Shrine.read('neezyohma', saveFile, keypathReader, changeReader),
                noyaneha: Shrine.read('noyaneha', saveFile, keypathReader, changeReader),
                omanau: Shrine.read('omanau', saveFile, keypathReader, changeReader),
                owadaim: Shrine.read('owadaim', saveFile, keypathReader, changeReader),
                pumaagnitae: Shrine.read('pumaagnitae', saveFile, keypathReader, changeReader),
                qazatokki: Shrine.read('qazatokki', saveFile, keypathReader, changeReader),
                quaraym: Shrine.read('quaraym', saveFile, keypathReader, changeReader),
                qukahnata: Shrine.read('qukahnata', saveFile, keypathReader, changeReader),
                raqazunzo: Shrine.read('raqazunzo', saveFile, keypathReader, changeReader),
                reedahee: Shrine.read('reedahee', saveFile, keypathReader, changeReader),
                rinoyaa: Shrine.read('rinoyaa', saveFile, keypathReader, changeReader),
                ritaagzumo: Shrine.read('ritaagzumo', saveFile, keypathReader, changeReader),
                rokuwog: Shrine.read('rokuwog', saveFile, keypathReader, changeReader),
                ronakachta: Shrine.read('ronakachta', saveFile, keypathReader, changeReader),
                rotaooh: Shrine.read('rotaooh', saveFile, keypathReader, changeReader),
                ruccomaag: Shrine.read('ruccomaag', saveFile, keypathReader, changeReader),
                saaskosah: Shrine.read('saaskosah', saveFile, keypathReader, changeReader),
                sahdahaj: Shrine.read('sahdahaj', saveFile, keypathReader, changeReader),
                sasakai: Shrine.read('sasakai', saveFile, keypathReader, changeReader),
                shadanaw: Shrine.read('shadanaw', saveFile, keypathReader, changeReader),
                shaekatha: Shrine.read('shaekatha', saveFile, keypathReader, changeReader),
                shaeloya: Shrine.read('shaeloya', saveFile, keypathReader, changeReader),
                shaemosah: Shrine.read('shaemosah', saveFile, keypathReader, changeReader),
                shagehma: Shrine.read('shagehma', saveFile, keypathReader, changeReader),
                shaiutoh: Shrine.read('shaiutoh', saveFile, keypathReader, changeReader),
                shaiyota: Shrine.read('shaiyota', saveFile, keypathReader, changeReader),
                shawarvo: Shrine.read('shawarvo', saveFile, keypathReader, changeReader),
                sheemdagoze: Shrine.read('sheemdagoze', saveFile, keypathReader, changeReader),
                sheevaneer: Shrine.read('sheevaneer', saveFile, keypathReader, changeReader),
                sheevenath: Shrine.read('sheevenath', saveFile, keypathReader, changeReader),
                shehrata: Shrine.read('shehrata', saveFile, keypathReader, changeReader),
                shodantu: Shrine.read('shodantu', saveFile, keypathReader, changeReader),
                shodasah: Shrine.read('shodasah', saveFile, keypathReader, changeReader),
                shoqatatone: Shrine.read('shoqatatone', saveFile, keypathReader, changeReader),
                shorahah: Shrine.read('shorahah', saveFile, keypathReader, changeReader),
                sohkofi: Shrine.read('sohkofi', saveFile, keypathReader, changeReader),
                sumasahma: Shrine.read('sumasahma', saveFile, keypathReader, changeReader),
                tahmuhl: Shrine.read('tahmuhl', saveFile, keypathReader, changeReader),
                tahnooah: Shrine.read('tahnooah', saveFile, keypathReader, changeReader),
                talohnaeg: Shrine.read('talohnaeg', saveFile, keypathReader, changeReader),
                tawajinn: Shrine.read('tawajinn', saveFile, keypathReader, changeReader),
                tenakosah: Shrine.read('tenakosah', saveFile, keypathReader, changeReader),
                thokayu: Shrine.read('thokayu', saveFile, keypathReader, changeReader),
                tohyahsa: Shrine.read('tohyahsa', saveFile, keypathReader, changeReader),
                toquomo: Shrine.read('toquomo', saveFile, keypathReader, changeReader),
                totosah: Shrine.read('totosah', saveFile, keypathReader, changeReader),
                tukaloh: Shrine.read('tukaloh', saveFile, keypathReader, changeReader),
                tutsuwanima: Shrine.read('tutsuwanima', saveFile, keypathReader, changeReader),
                voolota: Shrine.read('voolota', saveFile, keypathReader, changeReader),
                wahgokatta: Shrine.read('wahgokatta', saveFile, keypathReader, changeReader),
                yahrin: Shrine.read('yahrin', saveFile, keypathReader, changeReader),
                yanaga: Shrine.read('yanaga', saveFile, keypathReader, changeReader),
                zaltawa: Shrine.read('zaltawa', saveFile, keypathReader, changeReader),
                zekasho: Shrine.read('zekasho', saveFile, keypathReader, changeReader),
                zunakai: Shrine.read('zunakai', saveFile, keypathReader, changeReader),

                // Champion's Ballad Shrines
                etsukorima: Shrine.read('etsukorima', saveFile, keypathReader, changeReader),
                kamiaomuna: Shrine.read('kamiaomuna', saveFile, keypathReader, changeReader),
                keedafunia: Shrine.read('keedafunia', saveFile, keypathReader, changeReader),
                keivetala: Shrine.read('keivetala', saveFile, keypathReader, changeReader),
                kiahtoza: Shrine.read('kiahtoza', saveFile, keypathReader, changeReader),
                kihiromoh: Shrine.read('kihiromoh', saveFile, keypathReader, changeReader),
                maheliya: Shrine.read('maheliya', saveFile, keypathReader, changeReader),
                noerajee: Shrine.read('noerajee', saveFile, keypathReader, changeReader),
                rinuhonika: Shrine.read('rinuhonika', saveFile, keypathReader, changeReader),
                rohtachigah: Shrine.read('rohtachigah', saveFile, keypathReader, changeReader),
                ruvokorbah: Shrine.read('ruvokorbah', saveFile, keypathReader, changeReader),
                satokoda: Shrine.read('satokoda', saveFile, keypathReader, changeReader),
                sharolun: Shrine.read('sharolun', saveFile, keypathReader, changeReader),
                shiragomar: Shrine.read('shiragomar', saveFile, keypathReader, changeReader),
                takamashiri: Shrine.read('takamashiri', saveFile, keypathReader, changeReader),
                yowakaita: Shrine.read('yowakaita', saveFile, keypathReader, changeReader)
            };
        },
        write: (modelJson, saveFile, effectMapPath) => {
            const keypathReader = getKeypathReader(effectMapPath);
            const changeWriter = getChangeWriter(saveFile, effectMapPath);

            // Main Questline Shrines
            return Shrine.write('resurrection', modelJson.resurrection, saveFile, keypathReader, changeWriter)
                .then(() => Shrine.write('akhvaquot', modelJson.akhvaquot, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('bareedanaag', modelJson.bareedanaag, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('boshkala', modelJson.boshkala, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('chaasqeta', modelJson.chaasqeta, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('daagchokah', modelJson.daagchokah, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('dagahkeek', modelJson.dagahkeek, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('dahhesho', modelJson.dahhesho, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('dahkaso', modelJson.dahkaso, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('dakatuss', modelJson.dakatuss, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('dakotah', modelJson.dakotah, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('daqakoh', modelJson.daqakoh, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('daqochisay', modelJson.daqochisay, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('dilamaag', modelJson.dilamaag, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('downaeh', modelJson.downaeh, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('dunbataag', modelJson.dunbataag, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('geeharah', modelJson.geeharah, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('gomaasaagh', modelJson.gomaasaagh, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('goraetorr', modelJson.goraetorr, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('hadahamar', modelJson.hadahamar, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('hawakoth', modelJson.hawakoth, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('hiamiu', modelJson.hiamiu, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('hilarao', modelJson.hilarao, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('ishtosoh', modelJson.ishtosoh, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('jabaij', modelJson.jabaij, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('jeenoh', modelJson.jeenoh, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('jitansami', modelJson.jitansami, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('joloonah', modelJson.joloonah, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('kaamyatak', modelJson.kaamyatak, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('kahmael', modelJson.kahmael, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('kahokeo', modelJson.kahokeo, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('kahyah', modelJson.kahyah, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('kamurog', modelJson.kamurog, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('kaomakagh', modelJson.kaomakagh, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('katahchuki', modelJson.katahchuki, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('katosaaug', modelJson.katosaaug, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('kayawan', modelJson.kayawan, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('kaynoh', modelJson.kaynoh, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('kayramah', modelJson.kayramah, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('keehayoog', modelJson.keehayoog, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('kehnamut', modelJson.kehnamut, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('kemakosassa', modelJson.kemakosassa, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('kemazoos', modelJson.kemazoos, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('kenaishakah', modelJson.kenaishakah, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('keoruug', modelJson.keoruug, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('ketohwawai', modelJson.ketohwawai, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('korguchideh', modelJson.korguchideh, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('korshohu', modelJson.korshohu, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('kuhnsidajj', modelJson.kuhnsidajj, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('kuhtakkar', modelJson.kuhtakkar, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('laknarokee', modelJson.laknarokee, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('lannokooh', modelJson.lannokooh, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('maaghalan', modelJson.maaghalan, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('maagnorah', modelJson.maagnorah, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('makarah', modelJson.makarah, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('mezzalo', modelJson.mezzalo, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('mijahrokee', modelJson.mijahrokee, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('mirroshaz', modelJson.mirroshaz, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('misaesuma', modelJson.misaesuma, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('moakeet', modelJson.moakeet, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('mogglatan', modelJson.mogglatan, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('monyatoma', modelJson.monyatoma, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('mozoshenno', modelJson.mozoshenno, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('muwojeem', modelJson.muwojeem, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('myahmagana', modelJson.myahmagana, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('namikaozz', modelJson.namikaozz, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('neezyohma', modelJson.neezyohma, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('noyaneha', modelJson.noyaneha, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('omanau', modelJson.omanau, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('owadaim', modelJson.owadaim, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('pumaagnitae', modelJson.pumaagnitae, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('qazatokki', modelJson.qazatokki, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('quaraym', modelJson.quaraym, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('qukahnata', modelJson.qukahnata, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('raqazunzo', modelJson.raqazunzo, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('reedahee', modelJson.reedahee, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('rinoyaa', modelJson.rinoyaa, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('ritaagzumo', modelJson.ritaagzumo, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('rokuwog', modelJson.rokuwog, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('ronakachta', modelJson.ronakachta, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('rotaooh', modelJson.rotaooh, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('ruccomaag', modelJson.ruccomaag, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('saaskosah', modelJson.saaskosah, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('sahdahaj', modelJson.sahdahaj, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('sasakai', modelJson.sasakai, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('shadanaw', modelJson.shadanaw, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('shaekatha', modelJson.shaekatha, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('shaeloya', modelJson.shaeloya, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('shaemosah', modelJson.shaemosah, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('shagehma', modelJson.shagehma, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('shaiutoh', modelJson.shaiutoh, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('shaiyota', modelJson.shaiyota, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('shawarvo', modelJson.shawarvo, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('sheemdagoze', modelJson.sheemdagoze, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('sheevaneer', modelJson.sheevaneer, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('sheevenath', modelJson.sheevenath, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('shehrata', modelJson.shehrata, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('shodantu', modelJson.shodantu, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('shodasah', modelJson.shodasah, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('shoqatatone', modelJson.shoqatatone, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('shorahah', modelJson.shorahah, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('sohkofi', modelJson.sohkofi, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('sumasahma', modelJson.sumasahma, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('tahmuhl', modelJson.tahmuhl, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('tahnooah', modelJson.tahnooah, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('talohnaeg', modelJson.talohnaeg, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('tawajinn', modelJson.tawajinn, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('tenakosah', modelJson.tenakosah, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('thokayu', modelJson.thokayu, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('tohyahsa', modelJson.tohyahsa, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('toquomo', modelJson.toquomo, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('totosah', modelJson.totosah, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('tukaloh', modelJson.tukaloh, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('tutsuwanima', modelJson.tutsuwanima, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('voolota', modelJson.voolota, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('wahgokatta', modelJson.wahgokatta, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('yahrin', modelJson.yahrin, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('yanaga', modelJson.yanaga, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('zaltawa', modelJson.zaltawa, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('zekasho', modelJson.zekasho, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('zunakai', modelJson.zunakai, saveFile, keypathReader, changeWriter))
                // Champion's Ballad Shrines
                .then(() => Shrine.write('etsukorima', modelJson.etsukorima, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('kamiaomuna', modelJson.kamiaomuna, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('keedafunia', modelJson.keedafunia, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('keivetala', modelJson.keivetala, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('kiahtoza', modelJson.kiahtoza, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('kihiromoh', modelJson.kihiromoh, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('maheliya', modelJson.maheliya, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('noerajee', modelJson.noerajee, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('rinuhonika', modelJson.rinuhonika, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('rohtachigah', modelJson.rohtachigah, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('ruvokorbah', modelJson.ruvokorbah, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('satokoda', modelJson.satokoda, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('sharolun', modelJson.sharolun, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('shiragomar', modelJson.shiragomar, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('takamashiri', modelJson.takamashiri, saveFile, keypathReader, changeWriter))
                .then(() => Shrine.write('yowakaita', modelJson.yowakaita, saveFile, keypathReader, changeWriter));
        }
    };
})();
