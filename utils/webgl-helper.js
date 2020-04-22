// 获取dom
function getDocument(str) {
    if (!str) {
        return null;
    }
    if (str.startsWith('#')) {
        return document.querySelector(str);
    }
    let result = document.querySelectorAll(str);
    if (result.length === 1) {
        return result[0];
    }
    return result;
}

// 获取canvas
function getCanvas(id) {
    return getDocument(id);
}

// 获取webgl绘图环境
function getWebGLContext(canvas) {
    return canvas.getContext('webgl') || canvas.getContext("experimental-webgl");
}

// 创建着色器程序
function createShader(gl, type, source) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    //检测是否编译正常
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

// 获取script标签内容
function createShaderFromScript(gl, type, scriptId) {
    let sourceScript = $$('#' + scriptId);
    if (!sourceScript) {
        return null;
    }
    return createShader(gl, type, sourceScript.innerHTML);
}