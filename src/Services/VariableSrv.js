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
    
    deleteData = (props) =>{
        return new Promise((resolve, reject)=>{
        const {start=0, count=0, id} = props;
        this.data = this.data.filter((row) =>row.id !== id);
        resolve(this.getData({start: start, count: count}));
        reject("Error Occured while deletion");
        });
    }
    
    addNewData = (props) =>{
        return new Promise((resolve, reject)=>{
            const {start=0, count=0, data} = props;
            let copyRow = Object.assign({...data},{
                id: Math.floor(Math.random()*100)});
            let dataList = [...this.data];
            dataList.splice(start,0,copyRow);
            this.data = dataList;
            resolve(this.getData({start: start, count: count}));
            reject("Error Occured");
        });
    }

    updateData = (args) =>{
        return new Promise((resolve, reject)=>{
            const {start=0, count=0, data} = args;
            let dataList = [...this.data];
            dataList.map(row =>{
                if(row.id === data.id){
                    row.variablevalue = data.variablevalue;
                    row.variablename = data.variablename;
                    row.variabletype = data.variabletype;
                }
            });
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