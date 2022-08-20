export const createElementId = () => {
    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

export const addLogMessage = (text) => {
    const textarea = document.getElementById("log-textarea");
    textarea.value += `> ${text}\n`;
    textarea.scrollTop = textarea.scrollHeight;
};
