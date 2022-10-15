
import { scryRenderedComponentsWithType } from "react-dom/test-utils";
import { createStore } from "redux";





 

        let des = (obj) => {
          if (obj && Array.isArray(obj)) {
            return [...obj].map((e) => des(e));
          } else if (obj && Object.keys(obj) && typeof obj == "object") {
          
            let objj = {};
            for (let val in obj) {
            
              objj[val] = des(obj[val]);
            }

            return objj;
          } else {
            return obj;
          }

          // }
        };


//  [1, 2, 3, 4, 5].map((e) => obj_(objj));
let timeout1;

let reducer = (
  state = { csv:[], active: undefined ,rerender:""},
  action
) => {
  let state_ = { ...state };
  let destruct;
  let maxx;

 
  let v;
    let columnid;
     
  if (action.act) {
    let parentid = state_.csv.findIndex((a) => a.id == state_.active);
    action.act.forEach((e) => {
      switch (e.type) {
        case "active":
          state_.active = e.id;
          break;
        case "csv":
          state_.active = e.csv.id
          state_.csv.push(e.csv);
          break;
        case "head":
        

          // columnid = state_.csv[parentid].obj.findIndex((a) => a.head == state_.head);
          v = undefined;
          e.value === ""
            ? (state_.csv[parentid].obj[e.columnindex].head = v)
            : (state_.csv[parentid].obj[e.columnindex].head = e.value);

         
          break;
        case "input":
          state_.csv[parentid].obj[e.columnindex].list[e.rowindex].value =
            e.value;

          break;
        case "addcolumn":
         
          state_.csv[parentid].history.pop();
          state_.csv[parentid].history.push([...state_.csv[parentid].obj]);
              

          state_.csv[parentid].obj.splice(e.columnindex + e.dir, 0, {
            head: undefined,
            id: Math.random(),
            list: state_.csv[parentid].maxlist.list.map((e) => (
              { id: Math.random(), value: "" })
            ),
          });
              
         
          state_.csv[parentid].history.push([...state_.csv[parentid].obj]);

          state_.csv[parentid].currenthistory = state_.csv[parentid].history.length - 1;

          break;

        case "deletecolumn":
       
          state_.csv[parentid].history.pop();

          state_.csv[parentid].history.push([...state_.csv[parentid].obj]);
          state_.csv[parentid].obj.splice(e.columnindex, 1);
           
          state_.csv[parentid].history.push([...state_.csv[parentid].obj]);
          state_.csv[parentid].currenthistory =
            state_.csv[parentid].history.length - 1;
              

          break;

        case "addrow":
         
          state_.csv[parentid].history.pop();
              
         
          destruct = des([...state.csv[parentid].obj]);
       
          // state_.csv[parentid].history.push([...state.csv[parentid].obj]);
          state_.csv[parentid].history.push(destruct);
          

          state_.csv[parentid].obj.forEach((ee, index, arr) => {
               
            ee.list.splice(e.rowindex + e.dir, 0, {
              id: Math.random(),
              value: "",
            });
              
           
          });
              
              
          state_.csv[parentid].history.push([...state_.csv[parentid].obj]);

          state_.csv[parentid].currenthistory =
            state_.csv[parentid].history.length - 1;
         

          break;
        case "merge":
          state_.rerender = Math.random();
          let parentid_ = state_.csv.findIndex(v => v.id == e.id)
      
          if (parentid_ >= 0) {
            state_.csv[parentid].history.pop();

           
            destruct = des([...state.csv[parentid].obj]);
           
            // state_.csv[parentid].history.push([...state.csv[parentid].obj]);
            state_.csv[parentid].history.push(destruct);
            switch (e.direction) {
              case "column":
                state_.csv[parentid].obj.forEach((e, index) => {
                  
                  let newlist = state_.csv[parentid_].obj.find(a => a.head == e.head);
                  if (newlist) {
                    e.list.push(...newlist.list)
                  }
                });
                break;
              case "row":
                state_.csv[parentid].obj.push(...state_.csv[parentid_].obj);
                break;
            }
            
            state_.csv[parentid].history.push(state_.csv[parentid].obj);
            state_.csv[parentid].currenthistory =
              state_.csv[parentid].history.length - 1;
          }
          break;
        //   case "mergewithcolumn":
        //       break;
        case "delete":
          let id = state_.csv[parentid - 1] || state_.csv[parentid + 1];
         
          state_.active = undefined;
          if (id) {
          

            state_.active = id.id;

            state_.csv.splice(parentid, 1);
          }
          break;
        case "history":
         
          state_.rerender = Math.random();
          let val = state_.csv[parentid].currenthistory + e.value;
        

          if (
            val <= 20 &&
            Math.sign(val) != -1 &&
            val < state_.csv[parentid].history.length
          ) {
            if (val == 20) {
              state_.csv[parentid].history.slice(0, 1);
            }
            state_.csv[parentid].currenthistory = val;

            state_.csv[parentid].obj =
              state_.csv[parentid].history[state_.csv[parentid].currenthistory];

           
          }

          break;
        case "deleterow":
        

          state_.csv[parentid].history.pop();
          destruct = des([...state.csv[parentid].obj]);
         
          // state_.csv[parentid].history.push([...state.csv[parentid].obj]);
          state_.csv[parentid].history.push(destruct);
          state_.csv[parentid].obj.forEach((ee, index) => {
            if (ee.list[e.rowindex] && ee.list.length != 1) {
              ee.list.splice(e.rowindex, 1);
              ee.list.push({id:Math.random(),value:""})
            }
            
          });
        
          
          state_.csv[parentid].history.push(state_.csv[parentid].obj);
          state_.csv[parentid].currenthistory =
            state_.csv[parentid].history.length - 1;
          break;

        case "addinput":
         
          state_.csv[parentid].history.pop();
          destruct = des([...state.csv[parentid].obj]);
          
          // state_.csv[parentid].history.push([...state.csv[parentid].obj]);
          state_.csv[parentid].history.push(destruct);
          state_.csv[parentid].obj[e.columnindex].list.splice(
            e.rowindex + e.dir,
            0,
            { id: Math.random(), value: "" }
          );
          
            state_.csv[parentid].obj.forEach((ee, index, arr) => {
                if (!ee.list[ state_.csv[parentid].obj[e.columnindex].list.length] && ee.list.length != 1) {
            
                  ee.list.push({ id: Math.random(), value: "" });
                }
            });
            
          state_.csv[parentid].history.push([...state_.csv[parentid].obj]);

          state_.csv[parentid].currenthistory =
            state_.csv[parentid].history.length - 1;

          break;
        case "deleteinput":
        
          state_.csv[parentid].history.pop();
          destruct = des([...state.csv[parentid].obj]);
         
          // state_.csv[parentid].history.push([...state.csv[parentid].obj]);
          state_.csv[parentid].history.push(destruct);
          state_.csv[parentid].obj[e.columnindex].list.splice(e.rowindex, 1);
          state_.csv[parentid].obj[e.columnindex].list.push({id:Math.random(),value:""});
            
          state_.csv[parentid].history.push([...state_.csv[parentid].obj]);
          state_.csv[parentid].currenthistory =
            state_.csv[parentid].history.length - 1;
          break;

        case "rerender":
          state_.rerender = e.value;
          //
          break;
      }
    });
   
  }
  
  return state_;
};

let store = createStore(reducer);

export default store
