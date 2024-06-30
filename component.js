import "primitive-type.js";

definePrimitiveType("sized", [], [
    "unit",
    "size"]);

definePrimitiveType("targeted", [], [
    "target"]);

definePrimitiveType("component", []);

definePrimitiveType("unit-component", ["component"]);

definePrimitiveType("text-component", ["component"], [
    "text"]);

definePrimitiveType("parent-component", ["component"], [
    {name: "children", default: []}]);

definePrimitiveType("block-component", ["component"]);

definePrimitiveType("inline-component", ["component"]);

definePrimitiveType("root-component", ["parent-component"], [
    {name: "labels", default: {}},
    "author",
    "copyright",
    "language"]);

definePrimitiveType("paragraph", ["parent-component", "block-component"], [
    {name: "indentation", default: 0}]);

definePrimitiveType("blockquote-header", ["parent-component", "block-component"]);

definePrimitiveType("blockquote", ["parent-component", "block-component"], [
    "source",
    {name: "indentation", default: 0}]);

definePrimitiveType("list", ["parent-component"]);

definePrimitiveType("list-item", ["parent-component"]);

definePrimitiveType("ordered-list", ["list", "block-component"]);

definePrimitiveType("ordered-list-item", ["list-item", "block-component"], [
    {name: "number", default: 0}]);

definePrimitiveType("unordered-list", ["list", "block-component"]);

definePrimitiveType("unordered-list-item", ["list-item", "block-component"]);

definePrimitiveType("header", ["parent-component", "block-component"], [
    {name: "depth", default: 0}]);

definePrimitiveType("horizontal-rule", ["unit-component", "block-component"]);

definePrimitiveType("code-block", ["text-component", "block-component"], [
    "language",
    {name: "options", default: []},
    {name: "depth", default: 0},
    {name: "inset", default: 0}]);

definePrimitiveType("instruction", ["block-component"]);

definePrimitiveType("message-instruction", ["instruction"], [
    "message"]);

definePrimitiveType("directives-instruction", ["instruction"], [
    "directives"]);

definePrimitiveType("set", ["instruction"], [
    "variable",
    "value"]);

definePrimitiveType("info", ["message-instruction"]);

definePrimitiveType("warning", ["message-instruction"]);

definePrimitiveType("error", ["message-instruction"]);

definePrimitiveType("include", ["instruction"], [
    "file"]);

definePrimitiveType("disable", ["directives-instruction"]);

definePrimitiveType("enable", ["directives-instruction"]);

definePrimitiveType("label", ["instruction", "targeted"]);

definePrimitiveType("raw", ["instruction", "targeted"]);

definePrimitiveType("comment", ["text-component", "block-component"]);

definePrimitiveType("embed", ["unit-component", "block-component", "targeted"], [
    {name: "options", default: []}]);

definePrimitiveType("image", ["embed"]);

definePrimitiveType("video", ["embed"]);

definePrimitiveType("audio", ["embed"]);

definePrimitiveType("source", ["embed"]);

definePrimitiveType("embed-option", []);

definePrimitiveType("loop-option", ["embed-option"]);

definePrimitiveType("autoplay-option", ["embed-option"]);

definePrimitiveType("width-option", ["embed-option", "sized"]);

definePrimitiveType("height-option", ["embed-option", "sized"]);

definePrimitiveType("float-option", ["embed-option"], [
    "direction"]);

definePrimitiveType("label-option", ["embed-option", "targeted"]);

definePrimitiveType("caption-option", ["embed-option", "parent-component"]);

definePrimitiveType("description-option", ["embed-option", "text-component"]);

definePrimitiveType("options-option", ["embed-option"], [
    {name: "options", default: []}]);

definePrimitiveType("language-option", ["embed-option"], [
    "language"]);

definePrimitiveType("start-option", ["embed-option"], [
    "start"]);

definePrimitiveType("end-option", ["embed-option"], [
    "end",
    {name: "offset", default: false}]);

definePrimitiveType("encoding-option", ["embed-option"], [
    "encoding"]);

definePrimitiveType("embed-link-option", ["embed-option", "targeted"]);

definePrimitiveType("footnote", ["parent-component", "block-component", "targeted"]);

definePrimitiveType("align", ["parent-component", "block-component"], [
    "alignment"]);

definePrimitiveType("bold", ["inline-component", "parent-component"]);

definePrimitiveType("italic", ["inline-component", "parent-component"]);

definePrimitiveType("underline", ["inline-component", "parent-component"]);

definePrimitiveType("strikethrough", ["inline-component", "parent-component"]);

definePrimitiveType("code", ["inline-component", "parent-component"]);

definePrimitiveType("subtext", ["inline-component", "parent-component"]);

definePrimitiveType("supertext", ["inline-component", "parent-component"]);

definePrimitiveType("url", ["inline-component", "unit-component", "targeted"]);

definePrimitiveType("compound", ["inline-component", "parent-component"], [
    {name: "options", default: []}]);

definePrimitiveType("compound-option", []);

definePrimitiveType("bold-option", ["compound-option"]);

definePrimitiveType("italic-option", ["compound-option"]);

definePrimitiveType("underline-option", ["compound-option"]);

definePrimitiveType("strikethrough-option", ["compound-option"]);

definePrimitiveType("spoiler-option", ["compound-option"]);

definePrimitiveType("font-option", ["compound-option"], [
    "font-family"]);

definePrimitiveType("color-option", ["compound-option"], [
    "red",
    "green",
    "blue"]);

definePrimitiveType("size-option", ["compound-option", "sized"]);

definePrimitiveType("link-option", ["compound-option", "targeted"]);

definePrimitiveType("internal-link-option", ["link-option"]);

definePrimitiveType("footnote-reference", ["inline-component", "unit-component", "targeted"]);

definePrimitiveType("en-dash", ["inline-component", "unit-component"]);

definePrimitiveType("em-dash", ["inline-component", "unit-component"]);

definePrimitiveType("newline", ["inline-component", "unit-component"]);
