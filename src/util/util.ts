// Error Message
export type ErrorMessage={
    resultCode : string;
    description : string;
}

// 1. Docker Image

// api/v1/image/pull
export type PullImage={
    pullImageFullName : string;
}

// api/v1/image/inspect
export type InspectImage={
    inspectImage: ImageDetailElements
}
export type ImageDetailElements = {
    createDate: string | null,
    updateDate: string | null,
    name: string | null,
    tag: string | null,
    os: string | null,
    architecture: string | null,
    size: string | null,
}


export type LsImageElements={
    lsImageList : LsImageElement[]
}
export type LsImageElement= {
	createDate: string|null,
	updateDate: string|null,
	name: string|null,
	tag: string|null,
	size: string|null,
}
// api/v1/image/rm
export type ImageRm={
    imageDeleteResult: boolean
}


// 2. Docker Network
//api/v1/network/ls
export type LsNetworkElements={
    lsNetworkElements : LsNetworkElement[]
}
export type LsNetworkElement={
    createDate : string | null,
    updateDate :string | null,
    name : string | null,
    subnet : string | null,
    ipRange :string | null,
    gateway : string | null,
}

//api/v1/network/create
export type CreateNetwork={
  networkName : string | null
}

//api/v1/network/inspect
export type InspectNetWork={
    inspectNetworkDetailElements : InspectNetWorkDetailElements
}

export type InspectNetWorkDetailElements={
    createDate : string|null;
    updateDate : string|null;
    name : string|null;
    subnet : string|null;
    ipRange : string|null;
    gateway : string|null;
    enableIcc : boolean,
    mtu : number,
    containerInfo : InspectNetworkContainerInto[]
}
export type InspectNetworkContainerInto={
    createDate : string | null,
    updateDate : string | null,
    name : string | null,
    imageName : string | null,
    imageTag : string | null,
    privateIp : string | null,
    outerPort : string | null,
    innerPort : string | null,
    status : string | null
}

//api/v1/network/rm
export type RemoveNetwork={
    networkDeleteResult : boolean
}
// 3. Docker Container

// api/v1/conatiner/ls
export type ContainerElementsList={
    containerElementsList : ContainerElements[]
}

export type ContainerElements={
    createDate : string | null;
    updateDate : string | null;
    name : string | null;
    imageName : string | null;
    imageTag : string | null;
    privateIp : string | null;
    outerPort : string | null;
    innerPort  : string | null;
    status : string;
}

// api/v1/conatiner/create
export type CreateContainer={
    containerName : string|null
}

// api/v1/conatiner/inspect
export type InspectContainer={
    inspectContainerDetailElements : ContainerDetailElements
}
export type ContainerDetailElements={
	createDate: string | null,
	updateDate: string | null,
	name: string | null,
	imageName: string | null,
	imageTag: string | null,
	privateIp: string | null,
	outerPort: string | null,
	innerPort: string | null,
	status: 'Created' | 'Running' | 'Restarting' | 'Exited' | 'Paused' | 'Dead',
	stopRm: boolean
}

// api/v1/conatiner/rm
export type RemoveConatiner={
    rmResult : boolean
}
// api/v1/conatiner/rename
export type RenameContainer={
    renameResult : boolean
}
// api/v1/conatiner/run
export type RunContainer={
    startResult : boolean
}
// api/v1/conatiner/start
export type StartContainer={
    startResult : boolean
}
// api/v1/conatiner/stop
export type StopContainer={
    stopResult : boolean
}

export type Response = 
    | ErrorMessage
    | PullImage
    | InspectImage
    | ImageRm
    | LsNetworkElements
    | LsImageElements
    | CreateNetwork
    | InspectNetWork
    | RemoveNetwork
    | ContainerElementsList
    | CreateContainer
    | InspectContainer
    | RemoveConatiner
    | RenameContainer
    | RunContainer
    | StartContainer
    | StopContainer;

    export const ParseResponse = (response: Response): string[] => {
        console.log(response)
        switch (true) {
            // 에러 메시지 처리
            case 'resultCode' in response: {
                const { resultCode, description } = response as ErrorMessage;
                return [`Error: [${resultCode}] : ${description}`];
            }
    
            // 이미지 Pull 처리
            case 'pullImageFullName' in response: {
                const { pullImageFullName } = response as PullImage;
                return [`Pulling Image: ${pullImageFullName}`];
            }
    
            // 이미지 목록 처리
            case 'lsImageList' in response: {
                const { lsImageList } = response as LsImageElements;
            
                // 첫 번째 줄: 헤더
                let output = [
                    `CREATE DATE`.padEnd(30) + `UPDATE DATE`.padEnd(30) + `NAME`.padEnd(20) + `TAG`.padEnd(20) + 'SIZE'.padEnd(20)
                ];
            
                // 이미지 요소 추가
                output = output.concat(lsImageList.map(image => {
                    const createDate = (image.createDate || '').padEnd(30, ' ');
                    const updateDate = (image.updateDate || '').padEnd(30, ' ');
                    const name = (image.name || '').padEnd(20, ' ');
                    const tag = (image.tag || '').padEnd(20, ' ');
                    const size = (image.size || '').padEnd(20, ' ');
            
                    // 각 필드를 합친다.
                    return createDate + updateDate + name + tag + size;
                }));
            
                return output;
            }

            // 이미지 Inspect 처리
            case 'inspectImage' in response: {
                const { inspectImage } = response as InspectImage;
                const { createDate, updateDate, name, tag, os, architecture, size } = inspectImage;
                return [
                    `Name:         ${(name || '').padEnd(20)}`,
                    `Tag:          ${(tag || '').padEnd(20)}`,
                    `Created:      ${(createDate || '').padEnd(20)}`,
                    `Updated:      ${(updateDate || '').padEnd(20)}`,
                    `OS:           ${(os || '').padEnd(20)}`,
                    `Architecture: ${(architecture || '').padEnd(20)}`,
                    `Size:         ${(size || '').padEnd(20)}`
                ];
            }
    
            // 이미지 삭제 결과 처리
            case 'imageDeleteResult' in response: {
                const { imageDeleteResult } = response as ImageRm;
                return [imageDeleteResult ? `Image deleted successfully.` : `Failed to delete image.`];
            }
    
            // 네트워크 목록 처리
            case 'lsNetworkElements' in response: {
                const { lsNetworkElements } = response as LsNetworkElements;
            
                // 첫 번째 줄: 헤더
                let output = [
                    `NETWORK NAME`.padEnd(20) + `SUBNET`.padEnd(20) + `IP RANGE`.padEnd(20) + `GATEWAY`.padEnd(20)
                ];
            
                // 네트워크 요소들을 추가
                output = output.concat(lsNetworkElements.map(network => {
                    const name = (network.name || '').padEnd(20, ' ');
                    const subnet = (network.subnet || '').padEnd(20, ' ');
                    const ipRange = (network.ipRange || '').padEnd(20, ' ');
                    const gateway = (network.gateway || '').padEnd(20, ' ');
            
                    // 각 필드를 합친다.
                    return name + subnet + ipRange + gateway;
                }));
            
                return output;
            }
            
    
            // 네트워크 생성 처리
            case 'networkName' in response: {
                const { networkName } = response as CreateNetwork;
                return [`Network created: ${networkName?.padEnd(20)}`];
            }
    
            // 네트워크 Inspect 처리
            case 'inspectNetworkDetailElements' in response: {
                const { inspectNetworkDetailElements } = response as InspectNetWork;
                const { createDate, updateDate, name, subnet, ipRange, gateway, enableIcc, mtu, containerInfo } = inspectNetworkDetailElements;
                
                // 문자열의 공백을 '\u00A0'로 패딩하여 길이를 맞춤
                const padString = (str: string, length: number) => {
                    const strLength = [...str].length; // 유니코드 문자열 길이를 정확히 계산
                    return str + '\u00A0'.repeat(length - strLength);
                };
            
                // container details를 포맷팅
                let containerDetails = containerInfo.map(container => {
                    const imageInfo = `${container.imageName || ''}:${container.imageTag || ''}`;  // 이미지 이름과 태그 붙여서 출력
                    const ports = `${container.outerPort || ''} -> ${container.innerPort || ''}`;   // 포트 정보를 붙여서 출력
                    return (
                        padString(container.name || '', 20)     // NAME
                        + padString(imageInfo, 30)              // IMAGE
                        + padString(container.privateIp || '', 15)  // IP
                        + padString(ports, 20)                 // PORTS (outer -> inner)
                        + padString(container.status || '', 15)  // STATUS
                    );
                });
            
                return [
                    `NETWORK INSPECT:`,
                    `Name:         ${name?.padEnd(20)}`,
                    `Subnet:       ${subnet?.padEnd(20)}`,
                    `IP Range:     ${ipRange?.padEnd(20)}`,
                    `Gateway:      ${gateway?.padEnd(20)}`,
                    `ICC Enabled:  ${enableIcc}`,
                    `MTU:          ${mtu}`,
                    `Containers:`,
                    padString('NAME', 20)
                    + padString('IMAGE', 30)
                    + padString('IP', 15)
                    + padString('PORTS', 20)
                    + padString('STATUS', 15),
                    ...containerDetails,
                    `Created: ${createDate}`,
                    `Updated: ${updateDate}`
                ];
            }
            
    
            // 네트워크 삭제 처리
            case 'networkDeleteResult' in response: {
                const { networkDeleteResult } = response as RemoveNetwork;
                return [networkDeleteResult ? `Network deleted successfully.` : `Failed to delete network.`];
            }
    
            // 컨테이너 목록 처리
            case 'containerElementsList' in response: {
                const { containerElementsList } = response as ContainerElementsList;
                
                // 문자열의 공백을 '\u00A0'로 패딩하여 길이를 맞춤
                const padString = (str: string, length: number) => {
                    const strLength = [...str].length; // 유니코드 문자열 길이를 정확히 계산
                    return str + '\u00A0'.repeat(length - strLength);
                };
            
                let output = [
                    padString('CONTAINERID', 20)
                    + padString('IMAGE', 20)
                    + padString('STATUS', 20)
                    + padString('PORTS', 20)
                    + padString('NAMES', 20)
                ];
            
                output = output.concat(containerElementsList.map(container => {
                    const ports = `${container.outerPort || 'null'}:${container.innerPort || 'null'}`;
                    return (
                        padString(container.name || ' ', 20)
                        + padString(container.imageName || '', 20)
                        + padString(container.status || '', 20)
                        + padString(ports, 20) 
                        + padString(container.name || '', 20)
                    );
                }));
            
                return output.map(line => line.replace(/ /g, '\u00A0'));
            }
            
            
            
    
            // 컨테이너 생성 처리
            case 'containerName' in response: {
                const { containerName } = response as CreateContainer;
                return [`Container created: ${containerName?.padEnd(20)}`];
            }
    
            // 컨테이너 Inspect 처리
            case 'inspectContainerDetailElements' in response: {
                const { inspectContainerDetailElements } = response as InspectContainer;
                if(inspectContainerDetailElements===null) return [`There's no container`]
                const { createDate, updateDate, name, imageName, imageTag, privateIp, outerPort, innerPort, status, stopRm } = inspectContainerDetailElements;
                return [
                    `CONTAINER INSPECT`,
                    `Name:         ${name?.padEnd(20)}`,
                    `Image:        ${imageName}:${imageTag?.padEnd(20)}`,
                    `IP:           ${privateIp?.padEnd(15)}`,
                    `Ports:        ${outerPort?.padEnd(10)} : ${innerPort?.padEnd(10)}`,
                    `Status:       ${status}`,
                    `Auto-remove:  ${stopRm}`,
                    `Created:      ${createDate}`,
                    `Updated:      ${updateDate}`
                ];
            }
    
            // 컨테이너 삭제 처리
            case 'rmResult' in response: {
                const { rmResult } = response as RemoveConatiner;
                return [rmResult ? `Container removed successfully.` : `Failed to remove container.`];
            }
    
            // 컨테이너 이름 변경 처리
            case 'renameResult' in response: {
                const { renameResult } = response as RenameContainer;
                return [renameResult ? `Container renamed successfully.` : `Failed to rename container.`];
            }
    
            // 컨테이너 시작 처리
            case 'startResult' in response: {
                const { startResult } = response as StartContainer;
                return [startResult ? `Container started successfully.` : `Failed to start container.`];
            }
    
            // 컨테이너 중지 처리
            case 'stopResult' in response: {
                const { stopResult } = response as StopContainer;
                return [stopResult ? `Container stopped successfully.` : `Failed to stop container.`];
            }
    
            // 기본 케이스: 알 수 없는 응답 처리
            default:
                return [`Error : Wrong Command`];
        }
    };
    