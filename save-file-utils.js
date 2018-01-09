var fs = require('fs');
var jBinary = require('jbinary');

const SaveFileUtils = {
	buildReader: (type, binary) => {
	    return (offset) => {
	        return binary.read(type, offset);
	    };
	},
	buildWriter: (type, binary) => {
	    return (offset, val) => {
	        binary.write(type, val, offset);
	    };
	},
	getChangesToApply: (changesFilepath) => {
		var addressesRaw = fs.readFileSync(changesFilepath, 'utf8');
		var addressLines = addressesRaw.split('\n');
		return addressLines.filter((line) => {
		    return line !== '' && line && line[0] !== '-';
		}).map((line) => {
		    const arr = line.split(' ');
		    return {
		        offset: parseInt(arr[0].slice(1), 16),
		        value: parseInt(arr[1], 16)
		    };
		});
	},
	getChangesToUnapply: (changesFilepath) => {
		var addressesRaw = fs.readFileSync(changesFilepath, 'utf8');
		var addressLines = addressesRaw.split('\n');
		return addressLines.filter((line) => {
		    return line !== '' && line && line[0] !== '+';
		}).map((line) => {
		    const arr = line.split(' ');
		    return {
		        offset: parseInt(arr[0].slice(1), 16),
		        value: parseInt(arr[1], 16)
		    };
		});
	},
	getChangesFromChunks: (chunks) => {
        return chunks.map((chunk) => {
            return chunk.addresses;
        }).reduce((acc, next) => {
        	return acc.concat(next);
        }, []);
	},
	getChunksFromChanges: (changes) => {
		return changes.map((entry) => {
			return {
		        addresses: [{
		            offset: entry.offset,
		            value: entry.value,
		        }],
		        getLast: function() {
		            return this.addresses.slice(-1)[0];
		        },
		        toString: function() {
		            return this.addresses.map((address) => {
		                return `0x${SaveFileUtils.toHexString(address.offset)}: ${SaveFileUtils.toHexString(address.value)}`;
		            }).join(', ');
		        }
		    }
	    }).reduce((acc, next) => {
		    let foundMatch = false;
		    const changedAcc = acc.map((chunk) => {
		        if (
		            chunk.getLast().offset + 4 == next.getLast().offset ||
		            chunk.getLast().offset + 8 == next.getLast().offset ||
		            chunk.getLast().offset + 12 == next.getLast().offset
		        ) {
		            foundMatch = true;
		            chunk.addresses = chunk.addresses.concat(next.addresses);
		        }
		        return chunk;
		    });

		    if (!foundMatch) {
		        acc.push(next);
		        return acc;
		    } else {
		        return changedAcc;
		    }
		}, []);
	},
	getChunksToApply: (changesFilepath) => {
	    return SaveFileUtils.getChunksFromChanges(SaveFileUtils.getChangesToApply(changesFilepath));
	},
	getChunksToUnapply: (changesFilepath) => {
	    return SaveFileUtils.getChunksFromChanges(SaveFileUtils.getChangesToUnapply(changesFilepath));
	},
	printChunks: (chunks) => {
	    console.log(chunks.map((chunk) => {
	        return '{ ' + chunk.toString() + ' }';
	    }).join('\n'));
	},
	withBinaryFileSync: (filename, funct, typeSet) => {
		const _typeSet = typeSet || SaveFileUtils.typeSet;
	    const data = fs.readFileSync(filename);
	    const binary = new jBinary(data, _typeSet);

	    // monkey patch in what I need!
	    binary.saveAsSync = function (dest, mimeType) {
	        var buffer = this.read('blob', 0);

	        buffer = new Buffer(buffer);

	        return fs.writeFileSync(dest, buffer);
	    };
	    
	    return funct(binary);
	},
	toHexString: (val) => {
	    const str = val.toString(16);
	    const padCount = 8 - str.length;
	    const pad = new Array(padCount + 1).join('0');
	    return pad + str;
	},
	typeSet: {
	  'word': ['array', 'uint32', 1]
	}
};

module.exports = SaveFileUtils;
