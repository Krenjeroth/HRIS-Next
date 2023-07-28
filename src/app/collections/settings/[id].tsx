import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { IBreadcrumbLink } from "../../../components/Breadcrumbs";
import { Heading1 } from "../../../components/commons/Headings/Heading1";
import { PollFrequencySettingForm } from "../../../components/Forms/PollFrequencySettingForm";
import { Layout } from "../../../components/Layout";
import HttpService from "../../../services/http.services";

const CollectionSettingsPage: NextPage = () => {
  const breadCrumbs: Array<IBreadcrumbLink> = [
    { name: "Home", link: "/" },
    { name: "Collections", link: "/collections" },
    { name: "Settings", link: "#" },
  ];

  const router = useRouter();
  const { id } = router.query;

  const [pollFreqValues, setPollFreqValues] = useState<Array<string> | null>(
    null
  );

  const [collectionFreqDBVal, setCollectionFreqDBVal] = useState<string>("");

  const fetchCollectionSetting = async () => {
    const resp = await HttpService.get(`/collection/settings/${id}`);
    setPollFreqValues(resp.data.freq_values);

    const collectionPollFreq = resp.data.settings.settings.find(
      (set: any) => set.name == "url_check_frequency"
    );
    collectionPollFreq && setCollectionFreqDBVal(collectionPollFreq.value);
  };

  useEffect(() => {
    if (id) fetchCollectionSetting();
  }, [id,reload]);

  return (
    <Layout pageTitle="Collection settings" breadCrumbs={breadCrumbs}>
      <div className="flex justify-start mb-6">
        <div>
          <Heading1 text="Collection settings" />
        </div>
      </div>
      <div className="flex justify-start">
        <div className="w-4/6 shadow rounded p-10 bg-white">
          {id && (
            <PollFrequencySettingForm
              collectionId={id?.toString()}
              pollFreqValues={pollFreqValues || null}
              collectionFreq={collectionFreqDBVal}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CollectionSettingsPage;
