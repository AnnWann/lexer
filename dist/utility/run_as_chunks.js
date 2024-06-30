"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run_as_chunks = run_as_chunks;
function run_as_chunks(thisField, buffer, predicate, operand, join, reconstruct, split_rule) {
    const size = buffer.length;
    if (size <= 0)
        return thisField;
    if (predicate(size))
        return operand(reconstruct(thisField, buffer));
    const [left, right] = split_rule ? split_rule(buffer) : [buffer.slice(0, size / 2), buffer.slice(size / 2, size - 1)];
    const right_result = run_as_chunks(thisField, right, predicate, operand, join, reconstruct, split_rule);
    const left_result = run_as_chunks(thisField, left, predicate, operand, join, reconstruct, split_rule);
    return join(left_result, right_result);
}
