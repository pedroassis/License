

function ClassLoader(rootFolder) {

    this.rootFolder = rootFolder;

    this.getAll = folder => {

    	var files = getFiles(rootFolder + folder);

    	return files.map(x => {
    		return require(x);
    	});
    }

    function getFiles(dir, files_){
        files_ = files_ || [];
        if (typeof files_ === 'undefined') files_=[];
        var files = fs.readdirSync(dir);
        for(var i in files){
            if (!files.hasOwnProperty(i)) continue;
            var name = dir+'/'+files[i];
            if (fs.statSync(name).isDirectory()){
                getFiles(name,files_);
            } else {
                files_.push(name);
            }
        }
        return files_;
    }
}

module.exports = ClassLoader;