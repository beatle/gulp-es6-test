class Flags {
    getAll() {
        var promise = new Promise((resolve) => {
            setTimeout(() => {
                resolve([{ id: 1, title: "Flag 1" }]);
            }, 1000);
        });
        return promise;
    }
}

export default Flags;
