

// export function generateRandomGenres() {

//     const choices = ['Non-Fiction', 'Childrens', 'Fantasy', 'Fiction', 'Biography', 'Romance',
//         'Science Fiction', 'Young Adult'];

//     const chosen = [];

//     while (chosen.length !== 5) {
//         const num = Math.floor(Math.random() * 7);
//         if (!chosen.includes(choices[num])) chosen.push(choices[num]);
//     }

//     return chosen;
// }


// export function getRandomBooksByGenre(products) {
//     const filteredProducts = products.filter((product) => product.name === name);

//     const randomProducts = [];

//     if (filteredProducts.length < 10) return filteredProducts;

//     while (randomProducts.length !== 10) {
//         const index = Math.floor(Math.random() * filteredProducts.length);
//         if (!randomProducts.some(b => b['name'] === filteredProducts[index].barcode)) randomProducts.push(filteredProducts[index]);
//     }

//     return randomProducts;
// }

export function calculatePaging(pageInfo) {
    const pArr = [];

    if (pageInfo) {
        const total = pageInfo?.totalPages;
        const current = pageInfo?.currentPage;

        if (total <= 10) {
            for (let i = 1; i <= total; i++) {
                pArr.push(`${i}`);
            }
        } else if (total > 10 && current - 7 <= 0) {
            for (let i = 1; i <= 8; i++) {
                pArr.push(`${i}`);
            }

            pArr.push('...');
            for (let i = total - 1; i <= total; i++) {
                pArr.push(`${i}`);
            }

        } else if (total > 10 && total - 7 > 0 && total - current > 5) {
            for (let i = 1; i <= 2; i++) {
                pArr.push(`${i}`);
            }
            pArr.push('...');

            for (let i = current; i <= current + 4; i++) {
                pArr.push(`${i}`);
            }

            pArr.push('...');
            for (let i = total - 1; i < total; i++) {
                pArr.push(`${i + 1}`);
            }
        } else {
            for (let i = 1; i <= 2; i++) {
                pArr.push(`${i}`);
            }
            pArr.push('...');
            for (let i = total - 5; i <= total; i++) {
                pArr.push(`${i}`);
            }
        }
    }

    return pArr;
}
