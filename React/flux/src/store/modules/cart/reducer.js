import produce from 'immer';

// forma sem o immer que nao altera a imutabilidade
// const cart = (state = [], action) => {
//   switch (action.type) {
//     case 'ADD_TO_CART':
//       return [
//         ...state,
//         {
//           ...action.product,
//           amount: 1,
//         },
//       ];
//     default:
//       return state;
//   }
// };
const cart = (state = [], action) => {
  switch (action.type) {
    case '@cart/ADD_SUCCESS':
      return produce(state, (draft) => {
        // agora tudo será feito no sagas
        // const productIndex = draft.findIndex((p) => p.id === action.product.id);
        // if (productIndex >= 0) {
        //   draft[productIndex].amount += 1;
        // } else {
        //   draft.push({
        //     ...action.product,
        //     amount: 1,
        //   });
        // }
        const { product } = action;
        draft.push(product);
      });
    case '@cart/REMOVE':
      return produce(state, (draft) => {
        //se encontrar o igual ele removerá
        const productIndex = draft.findIndex((p) => p.id === action.id);

        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });
    case '@cart/UPDATE_AMOUNT_SUCCESS': {
      return produce(state, (draft) => {
        const productIndex = draft.findIndex((p) => p.id === action.id);

        if (productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount);
        }
      });
    }
    default:
      return state;
  }
};

export default cart;
