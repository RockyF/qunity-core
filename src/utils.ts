/**
 * Created by rockyl on 2019-04-22.
 *
 * 实体相关工具
 */

import {Entity} from "./Entity";

/**
 * 实体遍历(先序遍历)
 * @param target 目标实体`
 * @param hitChild 遇到子实体回调
 * @param level 深度，默认全部遍历
 * @param includeSelf 是否包括自身
 * @param fullCallback 子实体遍历完后回调
 * @param params 其他参数
 */
export function traverse(target: Entity, hitChild: (child: Entity, ...params) => boolean, level = -1, includeSelf = false, fullCallback?: (current: Entity) => void, ...params) {
	let interrupt;
	if (includeSelf) {
		let ps = [].concat(target, params);
		hitChild.apply(null, ps);
	}

	if (level !== 0) {
		for (let child of target.children) {
			let ps = [].concat(child, params);
			if (hitChild.apply(null, ps)) {
				interrupt = true;
				continue;
			}
			if (child.children.length > 0) {
				ps = [].concat(child, hitChild, level - 1, false, fullCallback, params);
				traverse.apply(null, ps);
			}
		}
	}

	!interrupt && fullCallback && fullCallback(target);
}

/**
 * 实体遍历(后序遍历且倒序)
 * @param target 目标实体
 * @param hitChild 遇到子实体回调
 * @param level 深度，默认全部遍历
 * @param includeSelf 是否包括自身
 * @param fullCallback 子实体遍历完后回调
 * @param params 其他参数
 */
export function traversePostorder(target: Entity, hitChild: (child: Entity, ...params) => boolean, level = -1, includeSelf = false, fullCallback?: (current: Entity) => void, ...params) {
	if (level !== 0) {
		for (let i = target.children.length - 1; i >= 0; i--) {
			const child = target.children[i];

			if (!child.enabled) {
				continue;
			}
			if (traversePostorder(child, hitChild, level - 1, false, fullCallback, ...params)) {
				return true;
			}
			if (hitChild(child, ...params)) {
				return true;
			}
		}
	}

	if (includeSelf) {
		hitChild(target, ...params);
	}

	fullCallback && fullCallback(target);
}

/**
 * 实体冒泡
 * @param target 目标实体
 * @param hitParent 遇到父实体回调
 * @param includeSelf 是否包括自身
 * @param params 其他参数
 */
export function bubbling(target: Entity, hitParent: (parent: Entity, ...params) => boolean, includeSelf = false, ...params) {
	if (includeSelf) {
		hitParent(target, ...params);
	}
	let entity = target;
	while (entity = entity.parent) {
		if (hitParent(entity, ...params)) {
			break;
		}
	}
}
