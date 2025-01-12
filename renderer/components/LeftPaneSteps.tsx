import React from "react";
import Select from "react-select";
import ReactTooltip from "react-tooltip";

interface IProps {
  progress: string;
  selectImageHandler: () => Promise<void>;
  selectFolderHandler: () => Promise<void>;
  handleModelChange: (e: any) => void;
  handleDrop: (e: any) => void;
  outputHandler: () => Promise<void>;
  upscaylHandler: () => Promise<void>;
  batchMode: boolean;
  setBatchMode: (arg: any) => void;
  imagePath: string;
  outputPath: string;
  doubleUpscayl: boolean;
  setDoubleUpscayl: (arg: boolean) => void;
  model: string;
  isVideo: boolean;
  setIsVideo: (arg: boolean) => void;
}

function LeftPaneSteps({
  progress,
  selectImageHandler,
  selectFolderHandler,
  handleModelChange,
  handleDrop,
  outputHandler,
  upscaylHandler,
  batchMode,
  setBatchMode,
  imagePath,
  outputPath,
  doubleUpscayl,
  setDoubleUpscayl,
  model,
  isVideo,
  setIsVideo,
}: IProps) {
  const handleBatchMode = () => {
    setBatchMode((oldValue) => !oldValue);
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: state.isSelected ? "red" : "blue",
      padding: 20,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 200,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  const modelOptions = [
    { label: "General Photo", value: "realesrgan-x4plus" },
    { label: "Digital Art", value: "realesrgan-x4plus-anime" },
    { label: "Sharpen Image", value: "models-DF2K" },
  ];

  return (
    <div className="animate-step-in animate flex h-screen flex-col gap-7 overflow-y-auto p-5 overflow-x-hidden">
      <div className="flex items-center justify-center gap-2 font-medium">
        <p>Image</p>
        <input
          type="radio"
          name="radio-1"
          className="radio"
          checked={!isVideo}
          onClick={() => setIsVideo(false)}
        />
        <input
          type="radio"
          name="radio-1"
          className="radio"
          checked={isVideo}
          onClick={() => setIsVideo(true)}
        />
        <p>Video</p>
      </div>

      {/* BATCH OPTION */}
      <div className="flex flex-row items-center gap-2">
        <input
          type="checkbox"
          className="toggle"
          onClick={handleBatchMode}
        ></input>
        <div
          className="tooltip tooltip-right relative z-50"
          data-tip="This will let you upscale all files in a folder at once"
        >
          <p className="mr-1 inline-block cursor-help text-sm">Batch Upscale</p>
        </div>
      </div>

      {/* STEP 1 */}
      <div data-tip={imagePath}>
        <p className="step-heading">Step 1</p>
        <button
          className="btn-primary btn"
          onClick={!batchMode ? selectImageHandler : selectFolderHandler}
        >
          Select {batchMode ? "Folder" : "Image"}
        </button>
      </div>

      {/* STEP 2 */}
      <div className="animate-step-in">
        <p className="step-heading">Step 2</p>
        <p className="mb-2 text-sm">Select Upscaling Type</p>

        <Select
          options={modelOptions}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator: () => null,
          }}
          onChange={handleModelChange}
          className="react-select-container"
          classNamePrefix="react-select"
          defaultValue={modelOptions[0]}
        />

        {model !== "models-DF2K" && !batchMode && (
          <div className="mt-2 flex items-center gap-1">
            <input
              type="checkbox"
              className="checkbox"
              checked={doubleUpscayl}
              onChange={(e) => {
                if (e.target.checked) {
                  setDoubleUpscayl(true);
                } else {
                  setDoubleUpscayl(false);
                }
              }}
            />
            <p
              className="cursor-pointer text-sm"
              onClick={(e) => {
                setDoubleUpscayl(!doubleUpscayl);
              }}
            >
              Double Upscayl
            </p>
            <div
              className="tooltip"
              data-tip="Enable this option to get an 8x upscayl. Note that this may not always work properly with all images, for example, images with really large resolutions."
            >
              <span className="badge-info badge cursor-help">i</span>
            </div>
          </div>
        )}
      </div>

      {/* STEP 3 */}
      <div className="animate-step-in" data-tip={outputPath}>
        <p className="step-heading">Step 3</p>
        <p className="mb-2 text-sm">Defaults to Image's path</p>
        <button className="btn-primary btn" onClick={outputHandler}>
          Set Output Folder
        </button>
      </div>

      {/* ADVANCED OPTION */}
      <div className="flex flex-row items-center gap-2">
        <input type="checkbox" className="checkbox" onClick={handleBatchMode} />
        <p
          className="mr-1 inline-block cursor-help text-sm"
          data-tip="This will let you upscale all files in a folder at once"
        >
          Advanced Options
        </p>
      </div>

      {/* STEP 4 */}
      <div className="animate-step-in">
        <p className="step-heading">Step 4</p>
        <button
          className="btn-accent btn"
          onClick={upscaylHandler}
          disabled={progress.length > 0}
        >
          {progress.length > 0 ? "Upscayling⏳" : "Upscayl"}
        </button>
      </div>
    </div>
  );
}

export default LeftPaneSteps;
