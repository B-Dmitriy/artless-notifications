var h = (s) => {
  throw TypeError(s);
};
var d = (s, t, e) => t.has(s) || h("Cannot " + e);
var n = (s, t, e) => (d(s, t, "read from private field"), e ? e.call(s) : t.get(s)), u = (s, t, e) => t.has(s) ? h("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(s) : t.set(s, e), f = (s, t, e, r) => (d(s, t, "write to private field"), r ? r.call(s, e) : t.set(s, e), e);
const m = "bottom-left";
function p(s) {
  return new Promise((t) => setTimeout(t, s));
}
var i;
class _ {
  constructor(t) {
    u(this, i, null);
    const { root: e, position: r, hideLatency: o, closing: a, defaultTitle: l } = t;
    if (n(this, i)) return n(this, i);
    f(this, i, {}), n(this, i).notesLimit = 3, n(this, i).closing = a || !0, n(this, i).defaultTitle = l || null, n(this, i).root = document.querySelector(e) || document.body, n(this, i).position = r || m, n(this, i).hideLatency = o || null;
    const c = document.createElement("div");
    c.classList.add("artless-notificator__container"), e && (n(this, i).root.style.position = "relative"), n(this, i).root.style.position = "relative", n(this, i).root.appendChild(c), n(this, i).container = c;
  }
  pushMessage(t, e, r) {
    const o = new T(t, e, r || n(this, i).defaultTitle);
    function a() {
      o.classList.add("artless-notificator__hide_left"), p(300).then(() => o.remove());
    }
    if (n(this, i).container.appendChild(o), n(this, i).closing) {
      const c = document.createElement("button");
      c.innerText = "X", c.addEventListener("click", a.bind(this)), o.firstChild.appendChild(c);
    }
    if (n(this, i).container.children.length > n(this, i).notesLimit && n(this, i).container.removeChild(n(this, i).container.firstChild), !n(this, i).hideLatency) return;
    const l = setTimeout(a, n(this, i).hideLatency);
    window.onbeforeunload = () => clearInterval(l);
  }
  info(t, e) {
    this.pushMessage("info", t, e);
  }
  error(t, e) {
    this.pushMessage("error", t, e);
  }
  warning(t, e) {
    this.pushMessage("warning", t, e);
  }
  success(t, e) {
    this.pushMessage("success", t, e);
  }
}
i = new WeakMap();
class T {
  constructor(t, e, r) {
    const o = document.createElement("div"), a = document.createElement("header"), l = document.createElement("h3"), c = document.createElement("p");
    return a.appendChild(l), o.appendChild(a), o.appendChild(c), l.innerText = r || "Artless notificator", c.innerText = e, o.classList.add("artless-notificator__item", `artless-notificator__${t}-item`), o;
  }
}
export {
  _ as Notificator
};
