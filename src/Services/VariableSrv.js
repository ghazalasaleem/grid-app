import Data from '../Datastore/data';

class VariableSrv{

    constructor(){
        this.data = Data;
    }

    getData = () =>{
        return this.data;
    }
    
    deleteData = (props) =>{
        return new Promise((resolve, reject)=>{
        const {id} = props;
        this.data = this.data.filter((row) =>row.id !== id);
        resolve(this.data);
        reject("Error Occured while deletion");
        });
    }
    
    addNewData = (props) =>{
        return new Promise((resolve, reject)=>{
            let copyRow = Object.assign({...props.data},{
                id: Math.floor(Math.random()*100)});
            let dataList = [...this.data];
            dataList.splice(0,0,copyRow);
            this.data = dataList;
            resolve(this.data);
            reject("Error Occured");
        });
    }

    updateData = (props) =>{
        
        return new Promise((resolve, reject)=>{
            const updatedRow = props.data;
            let dataList = [...this.data];
            dataList.map(row =>{
                if(row.id === updatedRow.id){
                    row.variablevalue = updatedRow.variablevalue;
                    row.variablename = updatedRow.variablename;
                    row.variabletype = updatedRow.variabletype;
                }
            });
            this.data  = dataList;
            resolve(this.data);
            reject("Error Occured while updating");
        });
    }
}

export default new VariableSrv();