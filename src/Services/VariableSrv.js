import Data from '../Datastore/data';

class VariableSrv{

    constructor(){
        this.data = Data;
    }

    getData = (args) =>{
        
        return new Promise((resolve, reject)=>{
            let list;
            this.sort({key: 'variablename', order: 'asc'});
            if(args && args.count){
                let endIndex = args.count+args.start;
                if(endIndex >= this.data.length) endIndex=this.data.length;
                list = this.data.slice(args.start, endIndex);
            }
            else{
                list = this.data;
            }
            resolve({totalRows: this.data.length, dataList:list});
            reject("Error Occured");
            });
    }

    setData = args =>{
        return new Promise ((resolve, reject)=>{
            const {start=0, count=0} = args;
            if(args && args.count){
                this.data.splice(start, count, ...args.list);
            }
            else{
                this.data = [...args.list];
            }
            resolve(this.getData({start: start, count: count}));
            reject("Error occured while setting data");
        });
    }
    
    deleteData = (props) =>{
        return new Promise((resolve, reject)=>{
        const {start=0, count=0, id, parentId} = props;
        if(parentId){
            let tempData = [...this.data];
            tempData.map(row =>{
                if(row.id === parentId){
                    row.childrenList = [...row.childrenList.filter(child => child.id !== id)];
                }
            });

            this.data = tempData;
        }
        else{
            this.data = this.data.filter((row) =>row.id !== id);
        }
        
        resolve(this.getData({start: start, count: count}));
        reject("Error Occured while deletion");
        });
    }
    
    addNewData = (props) =>{
        return new Promise((resolve, reject)=>{
            const {start=0, count=0, data, parentId} = props;
            let copyRow = Object.assign({...data},{
                id: Math.floor(Math.random()*100)});
            
            let dataList = [...this.data];
            if(parentId){
                dataList.map(row =>{
                    if(row.id === parentId){
                        row.childrenList.splice(0,0,copyRow);
                    }
                });
            }
            else{
                dataList.splice(start,0,copyRow);
            }
            this.data = dataList;
            resolve(this.getData({start: start, count: count}));
            reject("Error Occured");
        });
    }

    updateData = (args) =>{
        return new Promise((resolve, reject)=>{
            const {start=0, count=0, data, parentId} = args;
            let dataList = [...this.data];

            if(parentId){
                dataList.map(row =>{
                    if(row.id === parentId){
                        row.childrenList.map(child=>{
                            if(child.id === data.id){
                                child.variablevalue = data.variablevalue;
                                child.variablename = data.variablename;
                                child.variabletype = data.variabletype;
                            }
                        });
                    }
                });
            }
            else{
                dataList.map(row =>{
                    if(row.id === data.id){
                        row.variablevalue = data.variablevalue;
                        row.variablename = data.variablename;
                        row.variabletype = data.variabletype;
                    }
                });
            }            
            this.data  = dataList;
            resolve(this.getData({start: start, count: count}));
            reject("Error Occured while updating");
        });
    }

    sort = (args) =>{
        const {key, order, dataList} = args;
        let list, sortedList;
        if(dataList){
            list = [...dataList];
        }
        else{
            list = [...this.data];
        }
        sortedList =  key?(list.sort((a,b) => {
            let aVal = a[key].toLowerCase();
            let bVal = b[key].toLowerCase();
            if(aVal < bVal) return -1;
            else if(aVal > bVal) return 1;
            else return 0;
    
        })):list;
        if(order === 'desc') sortedList = sortedList.reverse();
        if(dataList){
            return sortedList;
        }
        else{
            this.data = [...sortedList];
        }
    }

    sortData = args =>{
        return new Promise((resolve, reject)=>{
        const sortedList = this.sort({...args});
        resolve(sortedList);
        reject("Error Occured while sorting");
        });
    }
}

export default new VariableSrv();