module.exports = (() => {
    const Shrine = require('./shrine.model.js');

    return {
        read: (saveFile, effectMapPath) => {
            return {
                // Main Questline Shrines
                akhvaquot: Shrine.read('akhvaquot', saveFile, effectMapPath),
                bareedanaag: Shrine.read('bareedanaag', saveFile, effectMapPath),
                boshkala: Shrine.read('boshkala', saveFile, effectMapPath),
                chaasqeta: Shrine.read('chaasqeta', saveFile, effectMapPath),
                daagchokah: Shrine.read('daagchokah', saveFile, effectMapPath),
                dagahkeek: Shrine.read('dagahkeek', saveFile, effectMapPath),
                dahhesho: Shrine.read('dahhesho', saveFile, effectMapPath),
                dahkaso: Shrine.read('dahkaso', saveFile, effectMapPath),
                dakatuss: Shrine.read('dakatuss', saveFile, effectMapPath),
                dakotah: Shrine.read('dakotah', saveFile, effectMapPath),
                daqakoh: Shrine.read('daqakoh', saveFile, effectMapPath),
                daqochisay: Shrine.read('daqochisay', saveFile, effectMapPath),
                dilamaag: Shrine.read('dilamaag', saveFile, effectMapPath),
                downaeh: Shrine.read('downaeh', saveFile, effectMapPath),
                dunbataag: Shrine.read('dunbataag', saveFile, effectMapPath),
                geeharah: Shrine.read('geeharah', saveFile, effectMapPath),
                gomaasaagh: Shrine.read('gomaasaagh', saveFile, effectMapPath),
                goraetorr: Shrine.read('goraetorr', saveFile, effectMapPath),
                hadahamar: Shrine.read('hadahamar', saveFile, effectMapPath),
                hawakoth: Shrine.read('hawakoth', saveFile, effectMapPath),
                hiamiu: Shrine.read('hiamiu', saveFile, effectMapPath),
                hilarao: Shrine.read('hilarao', saveFile, effectMapPath),
                ishtosoh: Shrine.read('ishtosoh', saveFile, effectMapPath),
                jabaij: Shrine.read('jabaij', saveFile, effectMapPath),
                jeenoh: Shrine.read('jeenoh', saveFile, effectMapPath),
                jitansami: Shrine.read('jitansami', saveFile, effectMapPath),
                joloonah: Shrine.read('joloonah', saveFile, effectMapPath),
                kaamyatak: Shrine.read('kaamyatak', saveFile, effectMapPath),
                kahmael: Shrine.read('kahmael', saveFile, effectMapPath),
                kahokeo: Shrine.read('kahokeo', saveFile, effectMapPath),
                kahyah: Shrine.read('kahyah', saveFile, effectMapPath),
                kamurog: Shrine.read('kamurog', saveFile, effectMapPath),
                kaomakagh: Shrine.read('kaomakagh', saveFile, effectMapPath),
                katahchuki: Shrine.read('katahchuki', saveFile, effectMapPath),
                katosaaug: Shrine.read('katosaaug', saveFile, effectMapPath),
                kayawan: Shrine.read('kayawan', saveFile, effectMapPath),
                kaynoh: Shrine.read('kaynoh', saveFile, effectMapPath),
                kayramah: Shrine.read('kayramah', saveFile, effectMapPath),
                keehayoog: Shrine.read('keehayoog', saveFile, effectMapPath),
                kehnamut: Shrine.read('kehnamut', saveFile, effectMapPath),
                kemakosassa: Shrine.read('kemakosassa', saveFile, effectMapPath),
                kemazoos: Shrine.read('kemazoos', saveFile, effectMapPath),
                kenaishakah: Shrine.read('kenaishakah', saveFile, effectMapPath),
                keoruug: Shrine.read('keoruug', saveFile, effectMapPath),
                ketohwawai: Shrine.read('ketohwawai', saveFile, effectMapPath),
                korguchideh: Shrine.read('korguchideh', saveFile, effectMapPath),
                korshohu: Shrine.read('korshohu', saveFile, effectMapPath),
                kuhnsidajj: Shrine.read('kuhnsidajj', saveFile, effectMapPath),
                kuhtakkar: Shrine.read('kuhtakkar', saveFile, effectMapPath),
                laknarokee: Shrine.read('laknarokee', saveFile, effectMapPath),
                lannokooh: Shrine.read('lannokooh', saveFile, effectMapPath),
                maaghalan: Shrine.read('maaghalan', saveFile, effectMapPath),
                maagnorah: Shrine.read('maagnorah', saveFile, effectMapPath),
                makarah: Shrine.read('makarah', saveFile, effectMapPath),
                mezzalo: Shrine.read('mezzalo', saveFile, effectMapPath),
                mijahrokee: Shrine.read('mijahrokee', saveFile, effectMapPath),
                mirroshaz: Shrine.read('mirroshaz', saveFile, effectMapPath),
                misaesuma: Shrine.read('misaesuma', saveFile, effectMapPath),
                moakeet: Shrine.read('moakeet', saveFile, effectMapPath),
                mogglatan: Shrine.read('mogglatan', saveFile, effectMapPath),
                monyatoma: Shrine.read('monyatoma', saveFile, effectMapPath),
                mozoshenno: Shrine.read('mozoshenno', saveFile, effectMapPath),
                muwojeem: Shrine.read('muwojeem', saveFile, effectMapPath),
                myahmagana: Shrine.read('myahmagana', saveFile, effectMapPath),
                namikaozz: Shrine.read('namikaozz', saveFile, effectMapPath),
                neezyohma: Shrine.read('neezyohma', saveFile, effectMapPath),
                noyaneha: Shrine.read('noyaneha', saveFile, effectMapPath),
                omanau: Shrine.read('omanau', saveFile, effectMapPath),
                owadaim: Shrine.read('owadaim', saveFile, effectMapPath),
                pumaagnitae: Shrine.read('pumaagnitae', saveFile, effectMapPath),
                qazatokki: Shrine.read('qazatokki', saveFile, effectMapPath),
                quaraym: Shrine.read('quaraym', saveFile, effectMapPath),
                qukahnata: Shrine.read('qukahnata', saveFile, effectMapPath),
                raqazunzo: Shrine.read('raqazunzo', saveFile, effectMapPath),
                reedahee: Shrine.read('reedahee', saveFile, effectMapPath),
                rinoyaa: Shrine.read('rinoyaa', saveFile, effectMapPath),
                ritaagzumo: Shrine.read('ritaagzumo', saveFile, effectMapPath),
                rokuwog: Shrine.read('rokuwog', saveFile, effectMapPath),
                ronakachta: Shrine.read('ronakachta', saveFile, effectMapPath),
                rotaooh: Shrine.read('rotaooh', saveFile, effectMapPath),
                ruccomaag: Shrine.read('ruccomaag', saveFile, effectMapPath),
                saaskosah: Shrine.read('saaskosah', saveFile, effectMapPath),
                sahdahaj: Shrine.read('sahdahaj', saveFile, effectMapPath),
                sasakai: Shrine.read('sasakai', saveFile, effectMapPath),
                shadanaw: Shrine.read('shadanaw', saveFile, effectMapPath),
                shaekatha: Shrine.read('shaekatha', saveFile, effectMapPath),
                shaeloya: Shrine.read('shaeloya', saveFile, effectMapPath),
                shaemosah: Shrine.read('shaemosah', saveFile, effectMapPath),
                shagehma: Shrine.read('shagehma', saveFile, effectMapPath),
                shaiutoh: Shrine.read('shaiutoh', saveFile, effectMapPath),
                shaiyota: Shrine.read('shaiyota', saveFile, effectMapPath),
                shawarvo: Shrine.read('shawarvo', saveFile, effectMapPath),
                sheemdagoze: Shrine.read('sheemdagoze', saveFile, effectMapPath),
                sheevaneer: Shrine.read('sheevaneer', saveFile, effectMapPath),
                sheevenath: Shrine.read('sheevenath', saveFile, effectMapPath),
                shehrata: Shrine.read('shehrata', saveFile, effectMapPath),
                shodantu: Shrine.read('shodantu', saveFile, effectMapPath),
                shodasah: Shrine.read('shodasah', saveFile, effectMapPath),
                shoqatatone: Shrine.read('shoqatatone', saveFile, effectMapPath),
                shorahah: Shrine.read('shorahah', saveFile, effectMapPath),
                sohkofi: Shrine.read('sohkofi', saveFile, effectMapPath),
                sumasahma: Shrine.read('sumasahma', saveFile, effectMapPath),
                tahmuhl: Shrine.read('tahmuhl', saveFile, effectMapPath),
                tahnooah: Shrine.read('tahnooah', saveFile, effectMapPath),
                talohnaeg: Shrine.read('talohnaeg', saveFile, effectMapPath),
                tawajinn: Shrine.read('tawajinn', saveFile, effectMapPath),
                tenakosah: Shrine.read('tenakosah', saveFile, effectMapPath),
                thokayu: Shrine.read('thokayu', saveFile, effectMapPath),
                tohyahsa: Shrine.read('tohyahsa', saveFile, effectMapPath),
                toquomo: Shrine.read('toquomo', saveFile, effectMapPath),
                totosah: Shrine.read('totosah', saveFile, effectMapPath),
                tukaloh: Shrine.read('tukaloh', saveFile, effectMapPath),
                tutsuwanima: Shrine.read('tutsuwanima', saveFile, effectMapPath),
                voolota: Shrine.read('voolota', saveFile, effectMapPath),
                wahgokatta: Shrine.read('wahgokatta', saveFile, effectMapPath),
                yahrin: Shrine.read('yahrin', saveFile, effectMapPath),
                yanaga: Shrine.read('yanaga', saveFile, effectMapPath),
                zaltawa: Shrine.read('zaltawa', saveFile, effectMapPath),
                zekasho: Shrine.read('zekasho', saveFile, effectMapPath),
                zunakai: Shrine.read('zunakai', saveFile, effectMapPath),

                // Champion's Ballad Shrines
                etsukorima: Shrine.read('etsukorima', saveFile, effectMapPath),
                kamiaomuna: Shrine.read('kamiaomuna', saveFile, effectMapPath),
                keedafunia: Shrine.read('keedafunia', saveFile, effectMapPath),
                keivetala: Shrine.read('keivetala', saveFile, effectMapPath),
                kiahtoza: Shrine.read('kiahtoza', saveFile, effectMapPath),
                kihiromoh: Shrine.read('kihiromoh', saveFile, effectMapPath),
                maheliya: Shrine.read('maheliya', saveFile, effectMapPath),
                noerajee: Shrine.read('noerajee', saveFile, effectMapPath),
                rinuhonika: Shrine.read('rinuhonika', saveFile, effectMapPath),
                rohtachigah: Shrine.read('rohtachigah', saveFile, effectMapPath),
                ruvokorbah: Shrine.read('ruvokorbah', saveFile, effectMapPath),
                satokoda: Shrine.read('satokoda', saveFile, effectMapPath),
                sharolun: Shrine.read('sharolun', saveFile, effectMapPath),
                shiragomar: Shrine.read('shiragomar', saveFile, effectMapPath),
                takamashiri: Shrine.read('takamashiri', saveFile, effectMapPath),
                yowakaita: Shrine.read('yowakaita', saveFile, effectMapPath)
            };
        },
        write: (modelJson, saveFile, effectMapPath) => {
            // Main Questline Shrines
            return Shrine.write('akhvaquot', modelJson.akhvaquot, saveFile, effectMapPath)
                .then(() => Shrine.write('bareedanaag', modelJson.bareedanaag, saveFile, effectMapPath))
                .then(() => Shrine.write('boshkala', modelJson.boshkala, saveFile, effectMapPath))
                .then(() => Shrine.write('chaasqeta', modelJson.chaasqeta, saveFile, effectMapPath))
                .then(() => Shrine.write('daagchokah', modelJson.daagchokah, saveFile, effectMapPath))
                .then(() => Shrine.write('dagahkeek', modelJson.dagahkeek, saveFile, effectMapPath))
                .then(() => Shrine.write('dahhesho', modelJson.dahhesho, saveFile, effectMapPath))
                .then(() => Shrine.write('dahkaso', modelJson.dahkaso, saveFile, effectMapPath))
                .then(() => Shrine.write('dakatuss', modelJson.dakatuss, saveFile, effectMapPath))
                .then(() => Shrine.write('dakotah', modelJson.dakotah, saveFile, effectMapPath))
                .then(() => Shrine.write('daqakoh', modelJson.daqakoh, saveFile, effectMapPath))
                .then(() => Shrine.write('daqochisay', modelJson.daqochisay, saveFile, effectMapPath))
                .then(() => Shrine.write('dilamaag', modelJson.dilamaag, saveFile, effectMapPath))
                .then(() => Shrine.write('downaeh', modelJson.downaeh, saveFile, effectMapPath))
                .then(() => Shrine.write('dunbataag', modelJson.dunbataag, saveFile, effectMapPath))
                .then(() => Shrine.write('geeharah', modelJson.geeharah, saveFile, effectMapPath))
                .then(() => Shrine.write('gomaasaagh', modelJson.gomaasaagh, saveFile, effectMapPath))
                .then(() => Shrine.write('goraetorr', modelJson.goraetorr, saveFile, effectMapPath))
                .then(() => Shrine.write('hadahamar', modelJson.hadahamar, saveFile, effectMapPath))
                .then(() => Shrine.write('hawakoth', modelJson.hawakoth, saveFile, effectMapPath))
                .then(() => Shrine.write('hiamiu', modelJson.hiamiu, saveFile, effectMapPath))
                .then(() => Shrine.write('hilarao', modelJson.hilarao, saveFile, effectMapPath))
                .then(() => Shrine.write('ishtosoh', modelJson.ishtosoh, saveFile, effectMapPath))
                .then(() => Shrine.write('jabaij', modelJson.jabaij, saveFile, effectMapPath))
                .then(() => Shrine.write('jeenoh', modelJson.jeenoh, saveFile, effectMapPath))
                .then(() => Shrine.write('jitansami', modelJson.jitansami, saveFile, effectMapPath))
                .then(() => Shrine.write('joloonah', modelJson.joloonah, saveFile, effectMapPath))
                .then(() => Shrine.write('kaamyatak', modelJson.kaamyatak, saveFile, effectMapPath))
                .then(() => Shrine.write('kahmael', modelJson.kahmael, saveFile, effectMapPath))
                .then(() => Shrine.write('kahokeo', modelJson.kahokeo, saveFile, effectMapPath))
                .then(() => Shrine.write('kahyah', modelJson.kahyah, saveFile, effectMapPath))
                .then(() => Shrine.write('kamurog', modelJson.kamurog, saveFile, effectMapPath))
                .then(() => Shrine.write('kaomakagh', modelJson.kaomakagh, saveFile, effectMapPath))
                .then(() => Shrine.write('katahchuki', modelJson.katahchuki, saveFile, effectMapPath))
                .then(() => Shrine.write('katosaaug', modelJson.katosaaug, saveFile, effectMapPath))
                .then(() => Shrine.write('kayawan', modelJson.kayawan, saveFile, effectMapPath))
                .then(() => Shrine.write('kaynoh', modelJson.kaynoh, saveFile, effectMapPath))
                .then(() => Shrine.write('kayramah', modelJson.kayramah, saveFile, effectMapPath))
                .then(() => Shrine.write('keehayoog', modelJson.keehayoog, saveFile, effectMapPath))
                .then(() => Shrine.write('kehnamut', modelJson.kehnamut, saveFile, effectMapPath))
                .then(() => Shrine.write('kemakosassa', modelJson.kemakosassa, saveFile, effectMapPath))
                .then(() => Shrine.write('kemazoos', modelJson.kemazoos, saveFile, effectMapPath))
                .then(() => Shrine.write('kenaishakah', modelJson.kenaishakah, saveFile, effectMapPath))
                .then(() => Shrine.write('keoruug', modelJson.keoruug, saveFile, effectMapPath))
                .then(() => Shrine.write('ketohwawai', modelJson.ketohwawai, saveFile, effectMapPath))
                .then(() => Shrine.write('korguchideh', modelJson.korguchideh, saveFile, effectMapPath))
                .then(() => Shrine.write('korshohu', modelJson.korshohu, saveFile, effectMapPath))
                .then(() => Shrine.write('kuhnsidajj', modelJson.kuhnsidajj, saveFile, effectMapPath))
                .then(() => Shrine.write('kuhtakkar', modelJson.kuhtakkar, saveFile, effectMapPath))
                .then(() => Shrine.write('laknarokee', modelJson.laknarokee, saveFile, effectMapPath))
                .then(() => Shrine.write('lannokooh', modelJson.lannokooh, saveFile, effectMapPath))
                .then(() => Shrine.write('maaghalan', modelJson.maaghalan, saveFile, effectMapPath))
                .then(() => Shrine.write('maagnorah', modelJson.maagnorah, saveFile, effectMapPath))
                .then(() => Shrine.write('makarah', modelJson.makarah, saveFile, effectMapPath))
                .then(() => Shrine.write('mezzalo', modelJson.mezzalo, saveFile, effectMapPath))
                .then(() => Shrine.write('mijahrokee', modelJson.mijahrokee, saveFile, effectMapPath))
                .then(() => Shrine.write('mirroshaz', modelJson.mirroshaz, saveFile, effectMapPath))
                .then(() => Shrine.write('misaesuma', modelJson.misaesuma, saveFile, effectMapPath))
                .then(() => Shrine.write('moakeet', modelJson.moakeet, saveFile, effectMapPath))
                .then(() => Shrine.write('mogglatan', modelJson.mogglatan, saveFile, effectMapPath))
                .then(() => Shrine.write('monyatoma', modelJson.monyatoma, saveFile, effectMapPath))
                .then(() => Shrine.write('mozoshenno', modelJson.mozoshenno, saveFile, effectMapPath))
                .then(() => Shrine.write('muwojeem', modelJson.muwojeem, saveFile, effectMapPath))
                .then(() => Shrine.write('myahmagana', modelJson.myahmagana, saveFile, effectMapPath))
                .then(() => Shrine.write('namikaozz', modelJson.namikaozz, saveFile, effectMapPath))
                .then(() => Shrine.write('neezyohma', modelJson.neezyohma, saveFile, effectMapPath))
                .then(() => Shrine.write('noyaneha', modelJson.noyaneha, saveFile, effectMapPath))
                .then(() => Shrine.write('omanau', modelJson.omanau, saveFile, effectMapPath))
                .then(() => Shrine.write('owadaim', modelJson.owadaim, saveFile, effectMapPath))
                .then(() => Shrine.write('pumaagnitae', modelJson.pumaagnitae, saveFile, effectMapPath))
                .then(() => Shrine.write('qazatokki', modelJson.qazatokki, saveFile, effectMapPath))
                .then(() => Shrine.write('quaraym', modelJson.quaraym, saveFile, effectMapPath))
                .then(() => Shrine.write('qukahnata', modelJson.qukahnata, saveFile, effectMapPath))
                .then(() => Shrine.write('raqazunzo', modelJson.raqazunzo, saveFile, effectMapPath))
                .then(() => Shrine.write('reedahee', modelJson.reedahee, saveFile, effectMapPath))
                .then(() => Shrine.write('rinoyaa', modelJson.rinoyaa, saveFile, effectMapPath))
                .then(() => Shrine.write('ritaagzumo', modelJson.ritaagzumo, saveFile, effectMapPath))
                .then(() => Shrine.write('rokuwog', modelJson.rokuwog, saveFile, effectMapPath))
                .then(() => Shrine.write('ronakachta', modelJson.ronakachta, saveFile, effectMapPath))
                .then(() => Shrine.write('rotaooh', modelJson.rotaooh, saveFile, effectMapPath))
                .then(() => Shrine.write('ruccomaag', modelJson.ruccomaag, saveFile, effectMapPath))
                .then(() => Shrine.write('saaskosah', modelJson.saaskosah, saveFile, effectMapPath))
                .then(() => Shrine.write('sahdahaj', modelJson.sahdahaj, saveFile, effectMapPath))
                .then(() => Shrine.write('sasakai', modelJson.sasakai, saveFile, effectMapPath))
                .then(() => Shrine.write('shadanaw', modelJson.shadanaw, saveFile, effectMapPath))
                .then(() => Shrine.write('shaekatha', modelJson.shaekatha, saveFile, effectMapPath))
                .then(() => Shrine.write('shaeloya', modelJson.shaeloya, saveFile, effectMapPath))
                .then(() => Shrine.write('shaemosah', modelJson.shaemosah, saveFile, effectMapPath))
                .then(() => Shrine.write('shagehma', modelJson.shagehma, saveFile, effectMapPath))
                .then(() => Shrine.write('shaiutoh', modelJson.shaiutoh, saveFile, effectMapPath))
                .then(() => Shrine.write('shaiyota', modelJson.shaiyota, saveFile, effectMapPath))
                .then(() => Shrine.write('shawarvo', modelJson.shawarvo, saveFile, effectMapPath))
                .then(() => Shrine.write('sheemdagoze', modelJson.sheemdagoze, saveFile, effectMapPath))
                .then(() => Shrine.write('sheevaneer', modelJson.sheevaneer, saveFile, effectMapPath))
                .then(() => Shrine.write('sheevenath', modelJson.sheevenath, saveFile, effectMapPath))
                .then(() => Shrine.write('shehrata', modelJson.shehrata, saveFile, effectMapPath))
                .then(() => Shrine.write('shodantu', modelJson.shodantu, saveFile, effectMapPath))
                .then(() => Shrine.write('shodasah', modelJson.shodasah, saveFile, effectMapPath))
                .then(() => Shrine.write('shoqatatone', modelJson.shoqatatone, saveFile, effectMapPath))
                .then(() => Shrine.write('shorahah', modelJson.shorahah, saveFile, effectMapPath))
                .then(() => Shrine.write('sohkofi', modelJson.sohkofi, saveFile, effectMapPath))
                .then(() => Shrine.write('sumasahma', modelJson.sumasahma, saveFile, effectMapPath))
                .then(() => Shrine.write('tahmuhl', modelJson.tahmuhl, saveFile, effectMapPath))
                .then(() => Shrine.write('tahnooah', modelJson.tahnooah, saveFile, effectMapPath))
                .then(() => Shrine.write('talohnaeg', modelJson.talohnaeg, saveFile, effectMapPath))
                .then(() => Shrine.write('tawajinn', modelJson.tawajinn, saveFile, effectMapPath))
                .then(() => Shrine.write('tenakosah', modelJson.tenakosah, saveFile, effectMapPath))
                .then(() => Shrine.write('thokayu', modelJson.thokayu, saveFile, effectMapPath))
                .then(() => Shrine.write('tohyahsa', modelJson.tohyahsa, saveFile, effectMapPath))
                .then(() => Shrine.write('toquomo', modelJson.toquomo, saveFile, effectMapPath))
                .then(() => Shrine.write('totosah', modelJson.totosah, saveFile, effectMapPath))
                .then(() => Shrine.write('tukaloh', modelJson.tukaloh, saveFile, effectMapPath))
                .then(() => Shrine.write('tutsuwanima', modelJson.tutsuwanima, saveFile, effectMapPath))
                .then(() => Shrine.write('voolota', modelJson.voolota, saveFile, effectMapPath))
                .then(() => Shrine.write('wahgokatta', modelJson.wahgokatta, saveFile, effectMapPath))
                .then(() => Shrine.write('yahrin', modelJson.yahrin, saveFile, effectMapPath))
                .then(() => Shrine.write('yanaga', modelJson.yanaga, saveFile, effectMapPath))
                .then(() => Shrine.write('zaltawa', modelJson.zaltawa, saveFile, effectMapPath))
                .then(() => Shrine.write('zekasho', modelJson.zekasho, saveFile, effectMapPath))
                .then(() => Shrine.write('zunakai', modelJson.zunakai, saveFile, effectMapPath))
                // Champion's Ballad Shrines
                .then(() => Shrine.write('etsukorima', modelJson.etsukorima, saveFile, effectMapPath))
                .then(() => Shrine.write('kamiaomuna', modelJson.kamiaomuna, saveFile, effectMapPath))
                .then(() => Shrine.write('keedafunia', modelJson.keedafunia, saveFile, effectMapPath))
                .then(() => Shrine.write('keivetala', modelJson.keivetala, saveFile, effectMapPath))
                .then(() => Shrine.write('kiahtoza', modelJson.kiahtoza, saveFile, effectMapPath))
                .then(() => Shrine.write('kihiromoh', modelJson.kihiromoh, saveFile, effectMapPath))
                .then(() => Shrine.write('maheliya', modelJson.maheliya, saveFile, effectMapPath))
                .then(() => Shrine.write('noerajee', modelJson.noerajee, saveFile, effectMapPath))
                .then(() => Shrine.write('rinuhonika', modelJson.rinuhonika, saveFile, effectMapPath))
                .then(() => Shrine.write('rohtachigah', modelJson.rohtachigah, saveFile, effectMapPath))
                .then(() => Shrine.write('ruvokorbah', modelJson.ruvokorbah, saveFile, effectMapPath))
                .then(() => Shrine.write('satokoda', modelJson.satokoda, saveFile, effectMapPath))
                .then(() => Shrine.write('sharolun', modelJson.sharolun, saveFile, effectMapPath))
                .then(() => Shrine.write('shiragomar', modelJson.shiragomar, saveFile, effectMapPath))
                .then(() => Shrine.write('takamashiri', modelJson.takamashiri, saveFile, effectMapPath))
                .then(() => Shrine.write('yowakaita', modelJson.yowakaita, saveFile, effectMapPath));
        }
    };
})();
