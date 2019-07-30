/**
 * Created by rockyl on 2019-04-22.
 *
 * 实体相关工具
 */
import { Entity } from "./Entity";
/**
 * 属性注入方法
 * @param target 目标对象
 * @param data 被注入对象
 * @param callback 自定义注入方法
 * @param ignoreMethod 是否忽略方法
 * @param ignoreNull 是否忽略Null字段
 *
 * @return 是否有字段注入
 */
export declare function injectProp(target: any, data?: any, callback?: Function, ignoreMethod?: boolean, ignoreNull?: boolean): boolean;
/**
 * 实体遍历(先序遍历)
 * @param target 目标实体`
 * @param hitChild 遇到子实体回调
 * @param level 深度，默认全部遍历
 * @param includeSelf 是否包括自身
 * @param fullCallback 子实体遍历完后回调
 * @param params 其他参数
 */
export declare function traverse(target: Entity, hitChild: (child: Entity, ...params: any[]) => boolean, level?: number, includeSelf?: boolean, fullCallback?: (current: Entity) => void, ...params: any[]): void;
/**
 * 实体遍历(后序遍历且倒序)
 * @param target 目标实体
 * @param hitChild 遇到子实体回调
 * @param level 深度，默认全部遍历
 * @param includeSelf 是否包括自身
 * @param fullCallback 子实体遍历完后回调
 * @param params 其他参数
 */
export declare function traversePostorder(target: Entity, hitChild: (child: Entity, ...params: any[]) => boolean, level?: number, includeSelf?: boolean, fullCallback?: (current: Entity) => void, ...params: any[]): boolean;
/**
 * 实体冒泡
 * @param target 目标实体
 * @param hitParent 遇到父实体回调
 * @param includeSelf 是否包括自身
 * @param params 其他参数
 */
export declare function bubbling(target: Entity, hitParent: (parent: Entity, ...params: any[]) => boolean, includeSelf?: boolean, ...params: any[]): void;
